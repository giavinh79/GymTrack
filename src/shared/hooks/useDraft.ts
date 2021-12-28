import { cloneDeep, isEqual } from 'lodash';
import { useMemo, useRef, useState } from 'react';

interface IObject {
  [key: string]: string;
}

type DraftValue = string | IObject;

export interface IUseDraftInput {
  value: DraftValue;
  onPublish: (value: DraftValue) => void;
}

export interface IUseDraftOutput {
  isEdited: boolean;
  change: (value: DraftValue) => DraftValue;
  publish: () => void;
}

/**
 * Custom hook when there is some interface with a draft state (and there is a need to confirm or revert changes)
 */
export const useDraft = ({ value, onPublish }: IUseDraftInput): IUseDraftOutput => {
  const originalValue = useRef(cloneDeep(value));

  const [clonedValue, setClonedValue] = useState(originalValue.current);

  const isEdited = useMemo((): boolean => {
    return isEqual(clonedValue, originalValue);
  }, [clonedValue, originalValue]);

  const change = (value: DraftValue) => {
    setClonedValue(value);
    return value;
  };

  const publish = () => {
    originalValue.current = clonedValue;
    onPublish(clonedValue);
  };

  return {
    isEdited,
    change,
    publish,
  };
};
