import heroVideo from '../../assets/VideoDog.mp4'

const HeroSection = () => {
  return (
    <header className="relative flex items-center justify-center min-h-screen overflow-hidden">      
        <div className="relative mx-3 -z-10 p-5 font-semibold text-white bg-purple-300 bg-opacity-50 rounded-xl">
            <div className=' max-w-lg text-center'>
                <h2 className='text-2xl mb-10 font-semibold capitalize'>good dog</h2>
                <h1 className='text-5xl mb-5'>Best <span className='text-blue-300 font-bold'>friends</span> made here</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, molestiae! Dicta assumenda esse, asperiores modi vero reprehenderit aut provident eligendi?</p>
            </div>
        </div>
        <video
            autoPlay
            loop
            muted
            className="absolute -z-30 top-0 left-0 w-full h-full object-cover object-center "
        >
            <source
                src={heroVideo}
                type="video/mp4"
            />  
        Your browser does not support the video tag.
        </video>
    </header>
  )
}

export default HeroSection