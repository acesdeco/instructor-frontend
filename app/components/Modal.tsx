import { useNavigate } from "@remix-run/react";
export default function Modal({
  isModalOpen,
  header,
  children,
  onAccept,
  acceptText,
  isForm,
}: {
  isModalOpen: boolean;
  header: string;
  children: React.ReactNode;
  onAccept?: () => void;
  acceptText?: string;
  isForm?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed backdrop-blur-md bg-white/50  h-screen w-screen inset-0 z-30 flex items-center justify-center  ${
        isModalOpen ? "scale-100" : "opacity-0 pointer-events-none scale-0"
      }`}
    >
      <div className="md:w-1/2 absolute p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-600">{header}</h2>
        <div>{children}</div>
        <div className="w-full flex gap-2 justify-end">
          {acceptText && (
            <button
              type={isForm ? "submit" : "button"}
              formMethod={isForm ? "post" : ""}
              onClick={onAccept}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {acceptText}
            </button>
          )}

          <button
            onClick={() => navigate(-1)
            }
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {acceptText ? "Cancel" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
