/* eslint-disable react/style-prop-object */
/* eslint-disable react/self-closing-comp */
import React from 'react';

const Icons = () => (
  <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
    <defs>
      <symbol id="icon-cross" viewBox="0 0 32 32">
        <title>cross</title>
        <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
      </symbol>
      <symbol id="icon-info" viewBox="0 0 20 20">
        <title>info</title>
        <path d="M10 0c5.512 0 10 4.489 10 10s-4.489 10-10 10c-5.512 0-10-4.489-10-10s4.489-10 10-10zM10 2.393c-4.189 0-7.607 3.418-7.607 7.607s3.417 7.607 7.607 7.607c4.189 0 7.607-3.418 7.607-7.607s-3.417-7.607-7.607-7.607z"></path>
        <path d="M8.75 8.125v7.5h2.5v-7.5z"></path>
        <path d="M8.75 4.375v2.5h2.5v-2.5z"></path>
      </symbol>
      <symbol id="icon-search" viewBox="0 0 20 20">
        <title>search</title>
        <path d="M16.178 14.304c1.146-1.519 1.784-3.291 1.784-5.316 0-4.936-3.949-8.988-8.916-8.988s-9.044 4.050-9.044 8.988c0 4.936 4.076 8.987 9.044 8.987 2.037 0 3.949-0.633 5.35-1.772l3.821 3.797c0 0 1.784-1.773 1.784-1.773l-3.822-3.924zM9.045 15.316c-3.566 0-6.496-2.785-6.496-6.329s2.93-6.456 6.496-6.456c3.566 0 6.496 2.911 6.496 6.456s-2.93 6.329-6.496 6.329z"></path>
      </symbol>
      <symbol id="icon-bucket" viewBox="0 0 18 20">
        <title>bucket</title>
        <path d="M13.9 13.39l1.779-0.198c0.573-0.064 1.058-0.45 1.249-0.994s0.053-1.148-0.354-1.556l-6.981-6.982c-0.779-0.779-2.042-0.779-2.821-0l-5.607 5.608c-0.746 0.745-1.165 1.757-1.165 2.812s0.419 2.067 1.166 2.812l2.803 2.803c0.745 0.746 1.757 1.166 2.813 1.166s2.067-0.42 2.813-1.166l4.306-4.306zM8.183 5.089l6.223 6.224-1.078 0.12c-0.227 0.025-0.438 0.127-0.599 0.288l-4.555 4.555c-0.37 0.37-0.87 0.578-1.393 0.578s-1.023-0.208-1.392-0.577l-2.803-2.804c-0.37-0.369-0.577-0.87-0.577-1.392s0.208-1.023 0.577-1.392l5.598-5.599z"></path>
        <path d="M15.694 14.862l-0.998 1.996c-0.302 0.604-0.183 1.333 0.294 1.81 0.293 0.294 0.693 0.46 1.109 0.46s0.815-0.166 1.109-0.46c0.477-0.477 0.595-1.206 0.293-1.81l-0.998-1.996c-0.167-0.334-0.643-0.334-0.81 0z"></path>
        <path d="M4.363 8.492v-4.49c0-0.776 0.629-1.405 1.405-1.405s1.405 0.629 1.405 1.405c0 0.554 0.449 1.004 1.004 1.004s1.004-0.449 1.004-1.004c0-1.885-1.528-3.413-3.413-3.413s-3.413 1.528-3.413 3.413v4.49c0 0.554 0.449 1.004 1.004 1.004s1.004-0.449 1.004-1.004z"></path>
      </symbol>
      <symbol id="icon-opacity" viewBox="0 0 18 20">
        <title>opacity</title>
        <path d="M14.866 5.174l-5.273-4.776c-0.611-0.554-1.631-0.524-2.214 0.059l-4.776 4.748c-1.66 1.66-2.592 3.902-2.534 6.263 0.029 2.359 0.99 4.572 2.709 6.204 1.603 1.515 3.729 2.33 5.971 2.33s4.369-0.845 5.971-2.359c1.719-1.631 2.68-3.845 2.709-6.204 0.059-2.33-0.845-4.572-2.564-6.262v-0.001zM13.322 16.184c-1.224 1.165-2.855 1.776-4.572 1.776s-3.35-0.641-4.572-1.776c-1.311-1.253-2.067-2.941-2.098-4.748s0.67-3.524 1.951-4.806l4.456-4.456 4.951 4.456c1.281 1.281 1.981 3 1.951 4.806 0 1.806-0.729 3.495-2.067 4.748v0z"></path>
        <path d="M12.624 7.475l-3.67-3.32c-0.146-0.145-0.379-0.029-0.379 0.175v12.321c0 0.116 0.116 0.232 0.232 0.232 0.554 0 1.106-0.087 1.631-0.291 4.165-1.544 4.894-6.407 2.185-9.116v-0.001z"></path>
      </symbol>
      <symbol id="icon-arrow-left" viewBox="0 0 13 20">
        <title>arrow-left</title>
        <path d="M0.625 10l9.063-10 2.188 2.014-7.234 7.986 7.234 7.986-2.188 2.014-8.149-8.992z"></path>
      </symbol>
      <symbol id="icon-expand" viewBox="0 0 32 20">
        <title>expand</title>
        <path d="M16 19l16-14.5-3.222-3.5-12.778 11.574-12.778-11.574-3.222 3.5 14.388 13.038z"></path>
      </symbol>
      <symbol id="icon-zoomin" viewBox="0 0 32 32">
        <title>zoomin</title>
        <path d="M18.5 0v13.5h13.5v5h-13.5v13.5h-5v-13.502l-13.5 0.002v-5l13.5-0.002v-13.498z"></path>
      </symbol>
      <symbol id="icon-zoomout" viewBox="0 0 128 32">
        <title>zoomout</title>
        <path d="M128 4h-128v24h128z"></path>
      </symbol>
      <symbol id="icon-stack" viewBox="0 0 20 20">
        <title>stack</title>
        <path d="M20 6.25l-10-5-10 5 10 5 10-5zM10 2.91l6.681 3.34-6.681 3.34-6.681-3.34 6.681-3.34zM17.997 8.998l2.003 1.002-10 5-10-5 2.003-1.002 7.997 3.998zM17.997 12.748l2.003 1.002-10 5-10-5 2.003-1.002 7.997 3.998z"></path>
      </symbol>
      <symbol id="icon-collapsed" viewBox="0 0 16 20">
        <title>collapsed</title>
        <path d="M8 0l0.806 0.731 7.194 6.519-1.611 1.75-6.389-5.787-6.389 5.787-1.611-1.75 7.194-6.519z"></path>
        <path d="M8 6.5l0.806 0.731 7.194 6.519-1.611 1.75-6.389-5.787-6.389 5.787-1.611-1.75 7.194-6.519z"></path>
        <path d="M6.75 7.609v12.391h2.5v-12.391z"></path>
      </symbol>
      <symbol id="icon-about" viewBox="0 0 5 20">
        <title>about</title>
        <path d="M5 2.5c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z"></path>
        <path d="M5 10c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z"></path>
        <path d="M5 17.5c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z"></path>
      </symbol>
      <symbol id="icon-close" viewBox="0 0 20 20">
        <title>close</title>
        <path d="M17.391 0l2.609 2.609-7.393 7.391 7.393 7.391-2.609 2.609-7.391-7.393-7.391 7.393-2.609-2.609 7.391-7.391-7.391-7.391 2.609-2.609 7.391 7.391z"></path>
      </symbol>
      <symbol id="icon-download" viewBox="0 0 20 20">
        <title>download</title>
        <path d="M11.563 0.046v10.188l6.424-5.72 2.014 2.151-10 8.914-10-8.914 2.014-2.151 6.424 5.722v-10.19z"></path>
        <path d="M0 19.954h20v-3.125h-20z"></path>
      </symbol>
      <symbol id="icon-dropdown" viewBox="0 0 20 20">
        <title>dropdown</title>
        <path d="M10 16.667l-10-13.333h20z"></path>
      </symbol>
      <symbol id="icon-menu" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 15v5h20v-5z"></path>
        <path d="M0 0v5h20v-5z"></path>
      </symbol>
      <symbol id="icon-pause" viewBox="0 0 24 32">
        <title>pause</title>
        <path fill="#fff" d="M0 0h7.384v32h-7.384z"></path>
        <path fill="#fff" d="M16.616 0h7.384v32h-7.384z"></path>
      </symbol>
      <symbol id="icon-play" viewBox="0 0 21 32">
        <title>play</title>
        <path fill="#fff" d="M0.076 0.222l20.426 15.778-20.426 15.778z"></path>
      </symbol>
      <symbol id="icon-info" viewBox="0 0 32 32">
        <title>info</title>
        <path d="M16 0c8.813 0 16 7.187 16 16s-7.187 16-16 16c-8.813 0-16-7.187-16-16s7.187-16 16-16zM16 2c-7.709 0-14 6.291-14 14s6.291 14 14 14c7.709 0 14-6.291 14-14s-6.291-14-14-14zM16 2c7.714 0 14 6.286 14 14s-6.287 14-14 14c-7.714 0-14-6.286-14-14s6.287-14 14-14zM16 4c-6.609 0-12 5.391-12 12s5.39 12 12 12c6.609 0 12-5.391 12-12s-5.39-12-12-12z"></path>
        <path d="M13.984 13.588h4.032v12.158h-4.032v-12.158zM15.984 23.746h0.032v-8.158h-0.032v8.158z"></path>
        <path
          strokeLinejoin="miter"
          strokeLinecap="butt"
          strokeMiterlimit="4"
          strokeWidth="2"
          d="M14.984 7.762h2.032v2.032h-2.032v-2.032z"
        ></path>
      </symbol>
      <symbol id="icon-twitter" viewBox="0 0 32 32">
        <title>twitter</title>
        <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
      </symbol>
      <symbol id="icon-instagram" viewBox="0 0 32 32">
        <title>instagram</title>
        <path d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z"></path>
        <path d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z"></path>
        <path d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z"></path>
      </symbol>
      <symbol id="icon-slideshare" viewBox="0 0 28 28">
        <title>slideshare</title>
        <path d="M13.641 11.562c0 1.734-1.516 3.156-3.375 3.156s-3.375-1.422-3.375-3.156c0-1.75 1.516-3.156 3.375-3.156s3.375 1.406 3.375 3.156zM21.484 11.562c0 1.734-1.5 3.156-3.375 3.156-1.859 0-3.375-1.422-3.375-3.156 0-1.75 1.516-3.156 3.375-3.156 1.875 0 3.375 1.406 3.375 3.156zM25 14.375v-10.422c0-1.797-0.578-2.5-2.234-2.5h-17.375c-1.734 0-2.219 0.594-2.219 2.5v10.516c3.703 1.937 6.875 1.594 8.609 1.531 0.734-0.016 1.203 0.125 1.484 0.422 0.047 0.047 0.094 0.094 0.156 0.141 0.328 0.313 0.641 0.562 0.953 0.797 0.063-0.859 0.547-1.406 1.844-1.359 1.766 0.078 5.016 0.422 8.781-1.625zM27.547 14.297c-1 1.234-2.906 2.75-5.812 3.938 3.078 10.484-7.516 12.156-7.344 6.781 0 0.094-0.016-2.891-0.016-5.109-0.234-0.047-0.469-0.109-0.75-0.172 0 2.234-0.016 5.375-0.016 5.281 0.172 5.375-10.422 3.703-7.344-6.781-2.906-1.188-4.813-2.703-5.812-3.938-0.5-0.75 0.047-1.547 0.875-0.969 0.109 0.078 0.234 0.156 0.344 0.234v-10.844c0-1.5 1.125-2.719 2.516-2.719h19.641c1.391 0 2.516 1.219 2.516 2.719v10.844l0.328-0.234c0.828-0.578 1.375 0.219 0.875 0.969z"></path>
      </symbol>
    </defs>
  </svg>
);

export default Icons;
