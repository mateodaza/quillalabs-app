import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import { events } from '../../lib/images'
import colors from '../../common/colors'
import Swiper from 'react-id-swiper';
import Layout from '../shared/Layout'
import WithAuth from '../../lib/withAuth'

function Events({t, store}) {
  console.log({t})
  const { isMobile } = store.authStore
  const params = {
    slidesPerView: isMobile ? 1 : 2,
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
    spaceBetween: 100,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  return (
    <Layout noHorizontalPadding> 
      <div className="content">
        <h3 className="title">{t('common:event-title')}</h3>
        <div className="slider-container">
          <Swiper {...params}>
            {
              ["lydtalk17", "startupgrind", "bot", "maker"].map((img, key)=>{
                return <div key={key}><img className="slider-img" src={events[img]}/></div>
              })
            }
          </Swiper>
        </div>

      </div>
      <style jsx>{`

      h3 {
        color: grey
      }

      .content {
        display: flex;
        align-items: center;
        margin-right: -5.1%;
        margin-top: -3%;
      }
      .title {
        width: 100%;
        padding: 0 5% 0 0;
        align-self: center
      }

      .slider-container {
        width: 55vw;
      }

      .slider-img {
        align-self: center;
        max-width: 90%;
        height: auto;
        box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
        -webkit-box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
        -moz-box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
        margin: 15% 0;
      }

      @media (max-width: 55.0rem) { 
        .content {
          flex-direction: column;
          margin: 0;
        }

        .slider-container {
          width: 100vw;
        }

        .slider-img {
          // width: 100vw;
          // height: 80vw
        }
      }

      `}</style>

      <style jsx global>{`
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

export default withTranslation(['common'])(WithAuth(Events, false))
