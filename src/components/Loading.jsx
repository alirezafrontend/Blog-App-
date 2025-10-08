import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
      <ClipLoader color="#fff" size={60}/>
    </div>
  );
}
