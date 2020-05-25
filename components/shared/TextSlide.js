import { useState } from 'react'
import { useTransition, animated} from 'react-spring'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from '../../i18n'
import colors from '../../common/colors'

function Text(slide, titles) {
  return (
    <div>
      <Link href={`/${titles[slide].route}`}>
        <a>{titles[slide].text}</a>
      </Link>
      <style jsx>{`
        a {
          font-size: 1.5em;
        }
      `}</style>
    </div>
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
        { Text(0, titles) }
        { Text(1, titles) }
      </div>
      <style jsx>{`
        .slider {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin: 12% 0;
          border-bottom: 2px solid ${colors.red};
        }
      `}</style>
    </div>
  )
}

export default TextSlide
