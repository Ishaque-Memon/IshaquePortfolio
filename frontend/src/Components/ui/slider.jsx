import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Lightweight shadcn-style Slider using a hidden native <input type="range"> for accessibility.
 * Exports: Slider, SliderTrack, SliderRange, SliderThumb
 *
 * Usage (example):
 * <Slider value={value} min={0} max={10} step={1} onValueChange={(v) => setValue(v)}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </Slider>
 */

const getPercent = (val, min, max) => {
  const v = Number(val);
  const minN = Number(min);
  const maxN = Number(max);
  if (isNaN(v) || isNaN(minN) || isNaN(maxN) || maxN === minN) return 0;
  return Math.min(100, Math.max(0, ((v - minN) / (maxN - minN)) * 100));
};

const Slider = ({
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  children,
  className = '',
  ariaLabel,
  ...props
}) => {
  const isControlled = controlledValue !== undefined;

  // normalize value (support number or array like Radix returns)
  const normalize = useCallback((v) => {
    if (Array.isArray(v)) return Number(v[0] ?? 0);
    return Number(v ?? 0);
  }, []);

  const initial = useMemo(() => {
    if (isControlled) return normalize(controlledValue);
    return normalize(defaultValue ?? min);
  }, [isControlled, controlledValue, defaultValue, min, normalize]);

  const [internalValue, setInternalValue] = useState(initial);
  const inputRef = useRef(null);

  // keep controlled -> internal sync
  useEffect(() => {
    if (isControlled) setInternalValue(normalize(controlledValue));
  }, [controlledValue, isControlled, normalize]);

  const handleChange = (e) => {
    const next = Number(e.target.value);
    if (!isControlled) setInternalValue(next);
    if (onValueChange) {
      // if controlled value was an array, mimic Radix and send array
      if (Array.isArray(controlledValue)) onValueChange([next]);
      else onValueChange(next);
    }
  };

  const percent = useMemo(() => getPercent(internalValue, min, max), [internalValue, min, max]);

  // expose a simple API through props.children composition: we'll clone children and pass required props via context-like props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    // inject slider internals to Track/Range/Thumb
    return React.cloneElement(child, {
      slider: {
        value: internalValue,
        min,
        max,
        step,
        percent,
        inputRef,
      },
    });
  });

  return (
    <div className={`relative w-full ${className}`} {...props}>
      {/* Native input for accessibility and keyboard support (transparent and covers the whole track) */}
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={handleChange}
        aria-label={ariaLabel || 'Slider'}
        className="absolute inset-0 w-full h-full opacity-0 appearance-none pointer-events-auto"
      />

      {/* Render the fancy children (track/range/thumb) */}
      <div className="relative w-full h-8 flex items-center select-none">{enhancedChildren}</div>
    </div>
  );
};

export const SliderTrack = ({ slider, className = '', children, ...props }) => {
  // The Track takes the full width and provides a background bar
  return (
    <div
      {...props}
      className={`relative h-2 w-full rounded-full ${className}`}
    >
      {/* background rail */}
      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      {/* children (Range) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const SliderRange = ({ slider, className = '', style = {}, ...props }) => {
  // SliderRange expects slider prop from parent (injected by Slider)
  const percent = slider?.percent ?? 0;
  return (
    <div
      {...props}
      className={`absolute left-0 top-0 h-2 rounded-full ${className}`}
      style={{ width: `${percent}%`, transition: 'width 120ms linear', ...style }}
    />
  );
};

export const SliderThumb = ({ slider, className = '', ariaLabel = 'Thumb', ...props }) => {
  const percent = slider?.percent ?? 0;
  const inputRef = slider?.inputRef;

  return (
    <div
      {...props}
      role="presentation"
      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 ${className}`}
      style={{ left: `${percent}%`, pointerEvents: 'none' }}
    >
      {/* visual thumb */}
      <div className="w-4 h-4 rounded-full shadow-md bg-white border border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700 pointer-events-none" aria-hidden />

      {/* Invisible focusable element positioned at the same place to aid accessibility (the native input handles focus) */}
    </div>
  );
};

// Support default export for simple import
export { Slider }; // also export Slider as a named export
export default Slider;