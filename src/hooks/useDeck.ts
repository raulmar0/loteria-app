import { useCallback, useEffect, useRef, useState } from 'react';
import { LOTERIA_CARDS } from '../data/cards';
import { shuffle } from '../lib/shuffle';
import type { Card } from '../types';

interface UseDeckResult {
  deck: number[];
  called: Card[];
  current: Card | null;
  remaining: number;
  total: number;
  callNext: () => Card | null;
  resetDeck: () => void;
}

function freshIndices(): number[] {
  return shuffle(LOTERIA_CARDS.map((_, i) => i));
}

export function useDeck(): UseDeckResult {
  const [deck, setDeck] = useState<number[]>(() => freshIndices());
  const [called, setCalled] = useState<Card[]>([]);
  const deckRef = useRef<number[]>(deck);

  useEffect(() => {
    deckRef.current = deck;
  }, [deck]);

  const resetDeck = useCallback(() => {
    const fresh = freshIndices();
    deckRef.current = fresh;
    setDeck(fresh);
    setCalled([]);
  }, []);

  const callNext = useCallback((): Card | null => {
    const current = deckRef.current;
    if (current.length === 0) return null;
    const [nextIdx, ...rest] = current;
    if (nextIdx === undefined) return null;
    const card = LOTERIA_CARDS[nextIdx];
    if (!card) return null;
    deckRef.current = rest;
    setDeck(rest);
    setCalled(prev => [card, ...prev]);
    return card;
  }, []);

  return {
    deck,
    called,
    current: called[0] ?? null,
    remaining: deck.length,
    total: LOTERIA_CARDS.length,
    callNext,
    resetDeck,
  };
}
