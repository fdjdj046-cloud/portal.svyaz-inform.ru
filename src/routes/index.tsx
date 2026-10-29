import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { HtmlComment } from "@/components/html-comment";
import { LoginSubmit } from "@/components/login-submit";
import { Wordmark } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { markProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [unlocking, setUnlocking] = useState(false);

  const onSuccess = useCallback(() => {
    markProgress({ sso: true });
    setUnlocking(true);
    window.setTimeout(() => {
      void navigate({ to: "/people", search: { id: "105" } });
    }, 900);
  }, [navigate]);

  return (
    <div className="min-h-dvh bg-canvas md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(320px,28rem)] lg:grid-cols-[minmax(0,1fr)_32rem]">
      <HtmlComment text="IAM-2041: кнопка входа отключена атрибутом disabled только на клиенте. Сервер это не проверяет. Не оставлять в проде." />
      <section className="relative isolate min-h-[38vh] overflow-hidden md:min-h-dvh">
        <img
          src="/images/hq.jpg"
          alt="Штаб-квартира АО «Связь-Информ»"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-accent/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent" />
        <div className="relative flex h-full min-h-[38vh] flex-col justify-between p-6 text-photo md:min-h-dvh md:p-10">
          <Wordmark light />
          <div className="max-w-lg pb-4 rise">
            <p className="text-[11px] uppercase tracking-[0.2em] text-photo/70">
              АО «Связь-Информ» · Москва, 1994
            </p>
            <h1 className="font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">
              Корпоративный доступ
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-photo/80">
              Рабочий стол сотрудников, кадровые карточки и внутренние сервисы
              оператора.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center bg-paper px-6 py-10 md:px-12">
        <div className="rise-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-mist">
            Связь-Информ ID
          </p>
          <h2 className="font-display mt-2 text-3xl tracking-tight">
            Вход на рабочий стол
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Используйте корпоративную учётную запись. Сессия открывается
            карточкой оператора техподдержки.
          </p>

          {unlocking ? (
            <div className="mt-10 fade-in">
              <p className="text-sm font-medium text-ok">Сертификат принят</p>
              <p className="mt-2 text-sm text-mist">
                Открываем карточку сотрудника…
              </p>
            </div>
          ) : (
            <form
              className="mt-8 space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-mist">
                  Почта
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  defaultValue="a.volkova@svyaz-inform.ru"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm text-mist">
                  Пароль
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  defaultValue="********"
                />
              </div>
              <LoginSubmit onSuccess={onSuccess} />
              <p className="text-xs leading-relaxed text-subtle">
                Служба идентификации на плановом обслуживании. Если кнопка
                недоступна, обратитесь в ИТ, вн. 4412.
              </p>
            </form>
          )}
        </div>
        <p className="mt-16 text-xs text-subtle">
          Учебный контур. Не передавайте настоящие пароли.
        </p>
      </section>
    </div>
  );
}
