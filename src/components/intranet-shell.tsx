import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/logo";
import type { Employee } from "@/lib/employees";
import { cn } from "@/lib/utils";

export function IntranetShell({
  employee,
  children,
  current,
}: {
  employee: Employee;
  children: ReactNode;
  current: "people" | "data" | "ops" | "archive";
}) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="border-b border-line bg-sheet">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" className="shrink-0" aria-label="На главную">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-1 text-sm md:flex">
            <Link
              to="/people"
              search={{ id: employee.id }}
              className={cn(
                "rounded-sm px-3 py-2 transition-colors duration-150",
                current === "people" ? "text-ink" : "text-mist hover:text-ink",
              )}
            >
              Люди
            </Link>
            <Link
              to="/data"
              className={cn(
                "rounded-sm px-3 py-2 transition-colors duration-150",
                current === "data" ? "text-ink" : "text-mist hover:text-ink",
              )}
            >
              Данные
            </Link>
            <Link
              to="/ops"
              className={cn(
                "rounded-sm px-3 py-2 transition-colors duration-150",
                current === "ops" ? "text-ink" : "text-mist hover:text-ink",
              )}
            >
              Консоль
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-none">{employee.name}</p>
              <p className="mt-1 text-xs text-mist">{employee.title}</p>
            </div>
            <img
              src={employee.photo}
              alt=""
              className="size-9 rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          </div>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-line px-4 text-sm md:hidden">
          <Link
            to="/people"
            search={{ id: employee.id }}
            className={cn(
              "shrink-0 px-3 py-3",
              current === "people" ? "text-ink" : "text-mist",
            )}
          >
            Люди
          </Link>
          <Link
            to="/data"
            className={cn(
              "shrink-0 px-3 py-3",
              current === "data" ? "text-ink" : "text-mist",
            )}
          >
            Данные
          </Link>
          <Link
            to="/ops"
            className={cn(
              "shrink-0 px-3 py-3",
              current === "ops" ? "text-ink" : "text-mist",
            )}
          >
            Консоль
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-subtle md:flex-row md:items-center md:justify-between md:px-6">
          <p>АО «Связь-Информ» · учебный контур · не является боевой системой</p>
          <p>Служба поддержки · вн. 4412</p>
        </div>
      </footer>
    </div>
  );
}
