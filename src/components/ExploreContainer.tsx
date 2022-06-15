import tw, { css } from 'twin.macro'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import List from '../pages/List';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const [counter, setCounter] = useState(0)

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
      <div tw="flex flex-col items-end">

        <button tw="
            p-3 w-min px-5
            bg-blue-500 bg-opacity-30
          "
          onClick={() => setCounter(counter + 1)}
        >Add</button>

        <br />

        <Link tw=" bg-purple-500 p-3 w-full text-right w-min px-8 " to={List.getPath()}>
          Lista
        </Link>

      </div>
    </div>
  );
};

export default ExploreContainer;
