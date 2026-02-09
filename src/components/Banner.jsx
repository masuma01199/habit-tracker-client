import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  return (
    <Swiper>
      <SwiperSlide>
        <h2>Build Better Habits Daily</h2>
        <p>Track progress and stay consistent</p>
      </SwiperSlide>

      <SwiperSlide>
        <h2>Create Powerful Streaks</h2>
        <p>Consistency builds long-term success</p>
      </SwiperSlide>

      <SwiperSlide>
        <h2>Boost Productivity</h2>
        <p>Small habits lead to big results</p>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;