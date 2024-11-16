export default function Overloader({ isLoading }:  {isLoading:boolean}) {
    return ( 
    <div className={`fixed h-screen w-screen top-0 z-30 backdrop-blur bg-black/20 left-0 flex justify-center items-center ${!isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`} >
       <div className="loader"></div> 
    </div>
    )
}