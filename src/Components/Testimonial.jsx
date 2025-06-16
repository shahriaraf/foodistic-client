import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">
        What People Say
      </h2>

      <div className="max-w-xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, Mousewheel]}
          direction="vertical"
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true , }}
          mousewheel={{ forceToAxis: true, thresholdDelta: 20, sensitivity: 1 }}
          style={{ height: '300px' }} // adjust as needed
        >
          {[
            {
              text:
                '"This platform has been a lifesaver! The food I received was fresh and exactly what I needed."',
              author: '- Sarah M.',
            },
            {
              text:
                '"I’m amazed at how easy it is to use. It feels good knowing I’m helping reduce food waste."',
              author: '- John D.',
            },
            {
              text:
                '"The food is always fresh, and the process is so simple. Thank you for this initiative!"',
              author: '- Emily R.',
            },
          ].map(({ text, author }, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-900 p-6 border-[1px] border-gray-500 rounded-lg shadow-lg h-full flex flex-col justify-center">
                <p className="text-gray-500 italic mb-4">{text}</p>
                <h3 className="text-sm font-bold text-gray-400">{author}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
