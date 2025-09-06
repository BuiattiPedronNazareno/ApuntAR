import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeAttr from "rehype-attr";
import rehypeRaw from "rehype-raw";

interface NotaRendererProps {
  contenido: string;
  notas: { id: number; titulo: string }[];
}

export default function NotaRenderer({ contenido, notas }: NotaRendererProps) {
  const regexNotas = /\[\[([^\]]+)\]\]/g;
  let procesado = contenido.replace(regexNotas, (_, titulo) => {
    const nota = notas.find((n) => n.titulo === titulo);
    return nota ? `[${titulo}](/notas/${nota.id})` : `~~${titulo}~~`;
  });

  procesado = procesado.replace(
    /!\[(.*?)\]\((.*?)\)\{size=(\d+)\}/g,
    `<img src="$2" alt="$1" width="$3" />`
  );

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ node, ...props }) => {
          const href = props.href ?? "#";
          const isInternal = href.startsWith("/");
          if (isInternal) {
            return (
              <Link
                href={href}
                style={{ color: "#234e68", textDecoration: "underline" }}
              >
                {props.children}
              </Link>
            );
          }
          return (
            <a
              {...props}
              href={href}
              style={{ color: "#234e68", textDecoration: "underline" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>
          );
        },
        img: ({ node, ...props }) => (
          <img
            {...props}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              display: "block",
              margin: "12px auto",
            }}
          />
        ),
      }}
    >
      {procesado}
    </ReactMarkdown>
  );
}