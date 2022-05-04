import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRef } from 'react';
import { useState } from 'react';

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <Box
      className={className}
      style={{ ...style }}
      sx={{ bgcolor: 'green', display: 'block' }}
    >
      <IconButton onClick={onClick}>
        <ChevronLeft />
      </IconButton>
    </Box>
  );
};

const RightArrow = ({ className, style, onClick }) => {
  return (
    <Box
      className={className}
      style={{ ...style }}
      sx={{ bgcolor: 'green', display: 'flex' }}
    >
      <IconButton onClick={onClick}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

const CustomSlider = ({ children, data, renderItem, renderKey }) => {
  const slider = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    // centerMode: true,
    slidesToScroll: 1,
    cssEase: 'linear',
    lazyLoad: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide(current),
  };

  const isPrevAllowed = Boolean(activeSlide > 0);
  const isNextAllowed = Boolean(
    data.length > settings.slidesToShow
      ? activeSlide + settings.slidesToShow < data.length
      : false
  );

  return (
    <Stack direction="row" display="flex" mt={2}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
        }}
      >
        <IconButton
          // disabled={isPrevAllowed}
          color="primary"
          onClick={() => slider.current.slickPrev()}
          size="small"
          sx={{
            ...(!isPrevAllowed && {
              display: 'none',
            }),
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
      </Box>

      <Box sx={{ width: '92%', flex: 1 }}>
        <Slider {...settings} ref={slider}>
          {/* {children} */}
          {data.map((e) => (
            <Box key={renderKey(e)}>{renderItem(e)}</Box>
          ))}
        </Slider>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
        }}
      >
        <IconButton
          // disabled={isNextAllowed}
          color="primary"
          onClick={() => slider.current.slickNext()}
          size="small"
          sx={{
            ...(!isNextAllowed && {
              display: 'none',
            }),
          }}
        >
          <ChevronRight fontSize="large" />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default CustomSlider;
