import "./Loader.less";

export default function WebLoader() {
  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-[9999]">
      <div className="loader"></div>
    </div>
  );
}
