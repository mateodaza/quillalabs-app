import { inject, observer } from 'mobx-react'
import { events } from '../../lib/images'
import colors from '../../common/colors'
import Swiper from 'react-id-swiper';
import Layout from '../shared/Layout'

function Events({store}) {
  const { isMobile } = store.authStore
  const params = {
    slidesPerView: isMobile ? 1 : 3,
    centeredSlides: true,
    loop: true,
    freeMode: isMobile ? false : true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        return '';
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  return (
    <Layout noHorizontalPadding>    
      <Swiper {...params}>
        {
          ["lydtalk17", "startupgrind", "bot", "maker"].map((img, key)=>{
            return <div key={key}><img className="slider-img" src={events[img]}/></div>

          })
        }
      </Swiper>

      <style jsx>{`

      `}</style>

      <style jsx global>{`
        .slider-img {
          align-self: center;
          max-width: ${isMobile ? '80%': '70%'};
          height: auto;
          box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
          margin-left: ${isMobile ? "9.5%" : 0}
        }
        .swiper-button-prev {
          color: ${colors.black3};
          background-color: transparent
        }
        .swiper-button-next {
          color: ${colors.black3};
          background-color: transparent
        }
      `}</style>
    </Layout>
  )
}

export default inject("store")(observer(Events))
