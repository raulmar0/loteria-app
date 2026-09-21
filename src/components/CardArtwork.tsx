import { useState } from 'react';
import { LoteriaIcon } from './LoteriaIcon';
import type { IconName } from '../types';

interface Props {
  name: IconName;
  color: string;
  accent: string;
}

export function CardArtwork({ name, color, accent }: Props) {
  const src = `${import.meta.env.BASE_URL}cards/${name}.webp`;
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;

  return (
    <div className="card-artwork" aria-hidden="true">
      {!loaded && <LoteriaIcon name={name} color={color} accent={accent} size={180} />}
      <img
        key={src}
        className={`card-artwork-image${loaded ? ' is-loaded' : ''}`}
        src={src}
        alt=""
        width={640}
        height={640}
        decoding="async"
        onLoad={async event => {
          const image = event.currentTarget;
          try {
            await image.decode();
            if (image.isConnected) setLoadedSrc(src);
          } catch {
            if (image.isConnected) setLoadedSrc(null);
          }
        }}
        onError={() => setLoadedSrc(null)}
      />
    </div>
  );
}
