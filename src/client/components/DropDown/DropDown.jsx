// import "./styles.css";
import React, { useState, useRef } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useInteractions,
  FloatingFocusManager,
  useTypeahead,
  offset,
  flip,
  size,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import styles from "./dropDown.module.css";
import { useSearchParams } from "react-router-dom";
const options = ["Red", "Orange", "Yellow", "Green"];

export default function DropDown({ name, options, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ mainAxis: false }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
  });
  const listRef = useRef([]);
  const listContentRef = useRef(options);
  const isTypingRef = useRef(false);
  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    // This is a large list, allow looping.
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    dismiss,
    role,
    listNav,
    typeahead,
    click,
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchObj = {};
  const handleSelect = (index) => {
    searchParams.forEach((value, key) => {
      searchObj[key] = value;
    });
    setSelectedIndex(index);
    setIsOpen(false);
    setSelectedOption(options[index]);
    if (options[index] != "Featured") {
      searchObj[name] = options[index];
    } else {
      delete searchObj[name];
    }
    setSearchParams(searchObj);
  };

  const selectedItemLabel = selectedIndex !== null ? options[selectedIndex] : "Featured";

  return (
    <>
      <div
        tabIndex={0}
        ref={refs.setReference}
        aria-labelledby={`select-${name}`}
        aria-autocomplete='none'
        style={{ width: 150, lineHeight: 2 }}
        {...getReferenceProps()}
        className={` ${type == "sort" ? styles.sorter : styles.dropdownButtons} `}>
        {type == "sort" ? name + " " + selectedItemLabel : name}
        <span className='material-symbols-outlined'>expand_more</span>
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                overflowY: "auto",
                background: "#eee",
                color: "black",
                minWidth: 100,
                borderRadius: 8,
                outline: 0,
              }}
              {...getFloatingProps()}>
              {options.map((value, i) => (
                <div
                  key={value}
                  ref={(node) => {
                    listRef.current[i] = node;
                  }}
                  role='option'
                  tabIndex={i === activeIndex ? 0 : -1}
                  aria-selected={i === selectedIndex && i === activeIndex}
                  style={{
                    padding: 10,
                    cursor: "default",
                    color: i === selectedIndex ? "white" : "black",
                    background: i === activeIndex ? "#0066FF" : "",
                  }}
                  {...getItemProps({
                    // Handle pointer select.
                    onClick() {
                      handleSelect(i);
                    },
                    // Handle keyboard select.
                    onKeyDown(event) {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSelect(i);
                      }
                      if (event.key === " " && !isTypingRef.current) {
                        event.preventDefault();
                        handleSelect(i);
                      }
                    },
                  })}>
                  {value}
                </div>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
