import join from 'loadsh/join';
import './index.less';
import test from './test.png'
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')
  const img = new Image();
  img.src = test;
  element.appendChild(img)
  console.log("1")
  return element;
}

document.body.appendChild(component());