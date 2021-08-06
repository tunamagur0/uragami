import React, { useContext } from 'react';
import { PaintContext } from '../App';
import { IconX } from '@tabler/icons';

type Props = {
  close: () => void;
};

const UtilItem: React.FC<Props> = ({ close }: Props) => {
  const context = useContext(PaintContext);

  return (
    <div className="header-item popup">
      <span
        className="absolute right-0 cursor-pointer mr-2 -mt-2 z-10"
        onClick={close}
      >
        <IconX className="w-5 h-5" />
      </span>
      <div className="flex m-2 flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (context.awPaint && e.target) {
              const image = context.awPaint.getIntegratedImage();
              const target = (e.target as HTMLFormElement)[0] as HTMLInputElement;
              const filename = (target.value || 'image') + '.png';
              const a = document.createElement('a');
              a.href = image;
              a.download = filename;
              a.click();
            }
          }}
        >
          <input className="focus:outline-none focus:ring focus:border-blue-300 text-gray-800"></input>
          <button className="btn px-2">ダウンロード</button>
        </form>
      </div>
    </div>
  );
};

export default UtilItem;
