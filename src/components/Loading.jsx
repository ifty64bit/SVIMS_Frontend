import { RotateLoader } from "react-spinners";
function Loading() {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="">
                <RotateLoader color="#36d7b7" />
            </div>
        </div>
    );
}

export default Loading