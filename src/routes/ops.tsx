import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HtmlComment } from "@/components/html-comment";
import { IntranetShell } from "@/components/intranet-shell";
import { employees } from "@/lib/employees";
import { markProgress } from "@/lib/progress";

export const Route = createFileRoute("/ops")({ component: OpsPage });

const intro = `Linux app-prod-01 5.15.0-x86_64
Сессия: root@bastion  uid=0
Контур: SI-MSK-3 · учебный
Введите help, если нужна справка.`;

function handleCommand(raw: string): { out: string; go?: boolean; clear?: boolean } {
  const cmd = raw.trim();
  const clean = cmd.toLowerCase().replace(/\s+/g, " ").trim();
  if (clean === "") return { out: "" };
  if (clean === "help") {
    return {
      out: "Команды: ls, cat [файл], whoami, pwd, date, hostname, clear",
    };
  }
  if (clean === "ls" || clean === "dir" || clean === "ls -la" || clean === "ls -l") {
    return { out: "server.py   users.db   SECRET_FLAG.txt   config.json" };
  }
  if (clean === "whoami") return { out: "root" };
  if (clean === "pwd") return { out: "/root" };
  if (clean === "hostname") return { out: "app-prod-01" };
  if (clean === "date") return { out: new Date().toUTCString() };
  if (clean === "id") return { out: "uid=0(root) gid=0(root) groups=0(root)" };
  if (clean === "cat secret_flag.txt" || clean === "cat ./secret_flag.txt") {
    return { out: "Чтение SECRET_FLAG.txt…", go: true };
  }
  if (clean.startsWith("cat ")) {
    return { out: "Файл недоступен либо зашифрован. Нужен SECRET_FLAG.txt." };
  }
  if (clean === "clear") return { out: "", clear: true };
  return { out: `bash: ${cmd}: команда не найдена` };
}

function OpsPage() {
  const navigate = useNavigate();
  const [log, setLog] = useState(intro);
  const [value, setValue] = useState("");
  const scroller = useRef<HTMLPreElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [log]);

  function submit(command: string) {
    const { out, go, clear } = handleCommand(command);
    if (clear) {
      setLog("Сессия root активна.");
      return;
    }
    const block = `\nroot@app-prod-01:~# ${command}${out ? `\n${out}` : ""}`;
    setLog((prev) => prev + block);
    if (go) {
      markProgress({ shell: true });
      window.setTimeout(() => {
        void navigate({ to: "/archive" });
      }, 900);
    }
  }

  return (
    <IntranetShell employee={employees["105"]} current="ops">
      <HtmlComment text="Секрет лежит в SECRET_FLAG.txt. Команды: ls, cat." />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
              Связь-Информ · консоль
            </p>
            <h1 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">
              Консоль сервера
            </h1>
          </div>
          <p className="text-xs text-subtle">
            bastion → app-prod-01 · ssh · 22/tcp
          </p>
        </div>

        <div
          className="mt-6 rounded-lg bg-ink p-4 text-photo shadow-paper md:p-5"
          onClick={() => input.current?.focus()}
        >
          <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-subtle">
            <span>root@app-prod-01</span>
            <span>connected</span>
          </div>
          <pre
            ref={scroller}
            className="max-h-[min(52vh,28rem)] overflow-y-auto whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-photo"
          >
            {log}
          </pre>
          <form
            className="mt-3 flex items-center gap-2 font-mono text-sm"
            onSubmit={(event) => {
              event.preventDefault();
              submit(value);
              setValue("");
            }}
          >
            <label htmlFor="cmd" className="shrink-0 text-photo">
              root@app-prod-01:~#
            </label>
            <input
              ref={input}
              id="cmd"
              value={value}
              autoComplete="off"
              spellCheck={false}
              autoFocus
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-photo outline-none"
              onChange={(event) => setValue(event.target.value)}
            />
            <span className="term-caret h-4 w-1.5 bg-photo" aria-hidden />
          </form>
        </div>
      </div>
    </IntranetShell>
  );
}
