import { useState, Fragment } from 'react'
import { useTransition, animated} from 'react-spring'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from '../../i18n'
import colors from '../../common/colors'

const slidesColors = { 1:'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)', 
0: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)', 
2: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)' }

function Text(slide, titles) {
  return (
    <Fragment>
      <div className="colorful-gradient">
        <Link href={`/${titles[slide].route}`} className="text">
          <a>{titles[slide].text}</a>
        </Link>
      </div>
      <style jsx>{`
        a {
          font-size: 1.5em;
          text-align: center;
        }
        .colorful-gradient {
          width: 100%;
          margin: 2% 0;
          background: /* gradient can be an image */
          ${slidesColors[slide.toString()]}
          left 
          bottom
          transparent    
          no-repeat; 
          background-size:100% 3px ;/* if linear-gradient, we need to resize it */
        }
      `}</style>
    </Fragment>
  )
}

function TextSlide(props) {
  let { titles } = props
  if(!titles) return null
  const [slide, setSlide] = useState(0);

  // TODO CHECK THIS ANIMATION
  const transitions = useTransition(slide, null, {
    from: {  opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  })
  
  const moveSlide =(add)=> {
    let addition = slide+add
    if(addition >= 0 && addition < titles.length) {
      setSlide(slide+add)
    }else {
      setSlide(0)
    }
  }

  return (
    <div>
      <div className="slider">
        {
          // transitions.map(({ item, key, props }) => <animated.div key={key} style={props}>
          //   {Text(slide, titles)}
          // </animated.div>) 
          // <a onClick={()=>moveSlide(1)}><FiChevronRight size="1.5em"/></a>
        }
        { Text(1, titles) }
        { Text(0, titles) }
        { Text(2, titles) }
      </div>
      <style jsx>{`
        .slider {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin: 12% 0;
          // border-bottom: 2px solid linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)
          // border-bottom: 2px solid ${colors.red};

        }
      `}</style>
    </div>
  )
}

export default TextSlide
