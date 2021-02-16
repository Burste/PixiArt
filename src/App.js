import * as PIXI from 'pixi.js'
import { useEffect } from 'react'
// eslint-disable-next-line import/no-unresolved
import imgLark from 'assets/img/lark.png'
import logo from './logo.svg'
import './App.css'

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x72ffff,
  resolution: window.devicePixelRatio || 1,
  clearBeforeRender: true
})

// CONSTANT
const BOUND_PADDING = 100
// IMAGES
const container = new PIXI.Container()
const textureLogo = PIXI.Texture.from(logo)
const textureLark = PIXI.Texture.from(imgLark)
const App = () => {

  const init = () => {

    app.renderer.autoResize = true
    app.renderer.resize(window.innerWidth / 2, window.innerHeight / 2)
    // Move container to the center
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2

  }

  // const init = () => {
  //   let type = 'WebGL'
  //   if (!PIXI.utils.isWebGLSupported()) {
  //     type = 'canvas'
  //   }

  //   PIXI.utils.sayHello(type)

  //   app.renderer.backgroundColor = 0x34d3ab
  //   app.renderer.view.style.position = 'absolute'
  //   app.renderer.view.style.display = 'block'
  //   app.renderer.autoResize = true
  //   app.renderer.resize(window.innerWidth, window.innerHeight)
  // }
  const setupRotation = () => {
    // const sprite = new PIXI.Sprite(PIXI.utils.TextureCache('./logo.svg'))

    // const img = new PIXI.Sprite(logo)
    // const img = PIXI.Texture.from('./logo.svg')
    const img = new PIXI.Sprite(textureLogo)
    // const img = PIXI.Sprite.from(logo)

    // img.anchor.set(0.5)
    container.addChild(img)

    app.stage.addChild(container)

    app.ticker.add((delta) => {
      // rotate the container!
      // use delta to create frame-independent transform

      // const newTexture = new PIXI.Sprite(textureLogo)
      // newTexture.anchor.set(0.5)
      // newTexture.x = delta
      // newTexture.y = delta
      img.rotation += 0.01
      container.rotation += 0.01
      // container.addChild(newTexture)
    })
  }

  const setupRandom = (num = 1) => {
    const imgData = []
    for (let i = 0; i < num; i++) {
      const img = PIXI.Sprite.from(textureLark)

      img.anchor.set(0.5)
      img.scale.set(Math.random() + 0.3)

      img.x = Math.random() * app.screen.width
      img.y = Math.random() * app.screen.height
      img.tint = Math.random() * 0xFFFFFF

      // create some extra properties that will control movement :
      // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
      img.direction = Math.random() * Math.PI * 2

      // this number will be used to modify the direction of the dude over time
      img.turningSpeed = Math.random() - 0.8

      // create a random speed for the dude between 2 - 4
      img.speed = 2 + Math.random() * 2

      // container.addChild(imgData)
      imgData.push(img)
      app.stage.addChild(img)
    }

    const dudeBounds = new PIXI.Rectangle(
      BOUND_PADDING,
      BOUND_PADDING,
      app.screen.width - BOUND_PADDING * 2,
      app.screen.height - BOUND_PADDING * 2
    )
    dudeBounds.tint = 0xFF0000
    app.ticker.add(() => {
      // iterate through the dudes and update their position
      for (let i = 0; i < imgData.length; i++) {
        const dude = imgData[i]
        dude.direction += dude.turningSpeed * 0.01
        dude.x += Math.sin(dude.direction) * dude.speed
        dude.y += Math.cos(dude.direction) * dude.speed
        dude.rotation = -dude.direction - Math.PI / 2

        // wrap the dudes by testing their bounds...
        if (dude.x < dudeBounds.x) {
          dude.x += dudeBounds.width
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
          dude.x -= dudeBounds.width
        }

        if (dude.y < dudeBounds.y) {
          dude.y += dudeBounds.height
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
          dude.y -= dudeBounds.height
        }
      }
    })
  }

  const setupShooting = (number = 1) => {
    const imgData = []

    for (let i = 0; i < number; i++) {
      const img = PIXI.Sprite.from(textureLark)

      img.scale.set(0.5)

      img.tint = Math.random() * 0xFFFFFF
      img.x = Math.random() * app.screen.width
      img.y = Math.random() * app.screen.height
      img.anchor.set(0.5)
      img.direction = Math.random() * 2
      img.speed = 2 + Math.random() * 3

      imgData.push(img)
      app.stage.addChild(img)
    }

    const boundary = new PIXI.Rectangle(-BOUND_PADDING, -BOUND_PADDING, app.screen.width, app.screen.height)

    app.ticker.add(() => {
      for (let i = 0; i < imgData.length; i++) {
        const plane = imgData[i]
        plane.x += plane.direction * plane.speed
        plane.y -= plane.direction * plane.speed

        if (plane.x < boundary.x) {
          plane.x += boundary.width
        } else if (plane.x > boundary.x + boundary.width) {
          plane.x -= boundary.width
        }

        if (plane.y < boundary.y) {
          plane.y += boundary.height
        } else if (plane.y > boundary.y + boundary.height) {
          plane.y -= boundary.height
        }
      }
    })
  }

  useEffect(() => {
    init()
    document.body.appendChild(app.view)
    // setupRotation()
    // setupRandom(3)
    setupShooting(22)
  }, [])

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  )
}

export default App
