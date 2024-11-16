import { ICourse } from "~/axios/Courses";
import QuillEditor from "../editor";
import { useState } from "react";
import Modal from "../Modal";
import "node_modules/video-react/dist/video-react.css";
import Player from "react-player/lazy";
export default function CourseInput({
  week,
  setWeek,
  submit,
}: {
  week: ICourse["weeks"][0];
  submit: () => void;
  setWeek: React.Dispatch<
    React.SetStateAction<ICourse["weeks"][0] | null | undefined>
  >;
}) {
  const [activeTab, setActiveTab] = useState<"notes" | "slides" | "video">(
    "notes"
  );
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const handleEditorChange = (change: string) => {
    setWeek((prev) => (prev ? { ...prev, notes: change } : prev));
    console.log(week);
  };

  const handleEmbedVideo = () => {
    if (videoUrl) {
      setWeek((prev) => (prev ? { ...prev, video: videoUrl } : prev));
    }
    setIsVideoModalOpen(false);
    console.log(week, "not for the weak");
  };
  console.log(week, "not for the weak");
  return (
    <section className="flex flex-col gap-4">
      <input
        className="text-2xl hover:border-b py-2 text-black  font-semibold bg-transparent focus:outline-none"
        value={week?.topic}
        placeholder="Add Course"
        onChange={(e) =>
          setWeek((prev) => (prev ? { ...prev, topic: e.target.value } : prev))
        }
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
            // setTopicInput("Add Course Topic...")
          }
        }}
      />
      <div className="flex gap-6 text-lg font-medium border-b">
        <span
          onClick={() => setActiveTab("notes")}
          className={
            activeTab == "notes"
              ? "border-b-2 border-blue-700"
              : "cursor-pointer"
          }
        >
          Notes
        </span>
        <span
          onClick={() => setActiveTab("slides")}
          className={
            activeTab == "slides"
              ? "border-b-2 border-blue-700"
              : "cursor-pointer"
          }
        >
          Slides
        </span>
        <span
          onClick={() => setActiveTab("video")}
          className={
            activeTab == "video"
              ? "border-b-2 border-blue-700"
              : "cursor-pointer"
          }
        >
          Video
        </span>
      </div>
      <div className="flex h-[30vh] w-full flex-col">
        {activeTab == "notes" ? (
          <QuillEditor value={week.notes} onChange={handleEditorChange} />
        ) : activeTab == "slides" ? (
          "This ought to be the the slides parts"
        ) : (
          <section className="w-full py-6">
            <Modal
              header="Embed Video Link"
              isModalOpen={isVideoModalOpen}
              setModalOpen={setIsVideoModalOpen}
              acceptText="Embed"
              onAccept={handleEmbedVideo}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  onChange={(e) => setVideoUrl(e.target.value)}
                  value={videoUrl}
                  placeholder="Enter Video URL"
                  className="border-2 bg-white border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </Modal>
            <div className="gap-3 flex flex-col w-full justify-center items-center">
              {week.video && (
                <div className="video-wrapper">
                  <Player url={week.video} />
                </div>
              )}
              <section className="flex gap-2">
                {/* <button className="bg-blue-700 rounded-md text-white py-2 px-4">
                  Upload a Video
                </button> */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-blue-700 rounded-md text-white py-2 px-4"
                >
                  {week.video ? "Change" : "Embed"} Video
                </button>
              </section>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
