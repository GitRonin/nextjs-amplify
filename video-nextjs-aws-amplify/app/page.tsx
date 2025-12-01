export const dynamic = "force-dynamic";

async function getPost() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${baseUrl}/posts/1`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: `Error: ${res.status}` };
    }

    return res.json();
  } catch {
    return { error: "Failed to fetch" };
  }
}

export default async function Home() {
  const deployedAt = new Date().toLocaleString("uk-UA");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "не налаштовано";
  const post = await getPost();
  const nodeEnv = process.env.NODE_ENV;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">
      <section className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Next.js + AWS Amplify
        </h1>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-3">
          <h2 className="font-semibold text-lg">Налаштування середовища</h2>
          <div className="space-y-2 text-sm">
            <p className="text-slate-300">
              <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded-md mr-2">
                NODE_ENV
              </span>
              {nodeEnv}
            </p>
            <p className="text-slate-300">
              <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded-md mr-2">
                NEXT_PUBLIC_API_URL
              </span>
              {apiUrl}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-3">
          <h2 className="font-semibold text-lg">SSR з зовнішнім API</h2>

          {"error" in post ? (
            <p className="text-red-400">{post.error}</p>
          ) : (
            <div className="text-sm space-y-2">
              <div className="bg-slate-800 p-3 rounded-lg space-y-1">
                <p>
                  <span className="font-semibold text-blue-400">ID:</span>{" "}
                  {post.id}
                </p>
                <p>
                  <span className="font-semibold text-blue-400">
                    Заголовок:
                  </span>{" "}
                  <span className="italic">{post.title}</span>
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Текст:</span>{" "}
                  {post.body}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-3">
          <h2 className="font-semibold text-lg">Час рендерингу</h2>
          <p className="font-mono text-sm bg-slate-800 px-3 py-2 rounded-md inline-block">
            {deployedAt}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-700 bg-blue-900/20 p-4 space-y-2">
          <h2 className="font-semibold text-blue-400">
            Про AWS Amplify деплой
          </h2>
          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
            <li>Автоматичний CI/CD з GitHub</li>
            <li>Змінні середовища через Amplify Console</li>
            <li>SSR підтримка з Next.js</li>
            <li>Глобальний CDN для статичних ресурсів</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
