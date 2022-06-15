import tw, { css } from 'twin.macro'
import { useState } from 'react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const [ counter, setCounter ] = useState(0)

  return (
    <div tw=" m-5 ">
      <strong css={[
        counter % 2 == 0 && tw`text-blue-200`,
        tw` text-4xl `
      ]}>Ready to create an app?</strong>
      <p css={[
        css`
          color: blue;
        `,
        tw` text-2xl `
      ]}>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components {' '}
      <span tw=" text-white font-bold ">{counter}</span>
    </a></p>
    <button tw="
      p-3 mt-2
      bg-blue-500 bg-opacity-30
    "
    onClick={ () => setCounter(counter + 1) }
      >Add</button>
    </div>
  );
};

export default ExploreContainer;
