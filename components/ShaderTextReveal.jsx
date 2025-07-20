import { useEffect, useRef } from "react";
import {
  Renderer,
  Vec2,
  Vec4,
  Geometry,
  Texture,
  Program,
  Mesh,
  Flowmap,
} from "ogl";

export default function ShaderTextReveal({ textSVG, bgImage }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const _size = [2048, 1638];
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;

    if (!containerRef.current) return;
    containerRef.current.appendChild(gl.canvas);

    let aspect = 1;
    const mouse = new Vec2(-1);
    const velocity = new Vec2();

    const flowmap = new Flowmap(gl, {
      falloff: 0.3,
      dissipation: 0.92,
      alpha: 0.5,
    });

    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2]),
      },
    });

    const texture = new Texture(gl, {
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => (texture.image = img);
    img.src = bgImage;

    let a1, a2;
    const imageAspect = _size[1] / _size[0];

    const resize = () => {
      gl.canvas.width = window.innerWidth * 2;
      gl.canvas.height = window.innerHeight * 2;
      gl.canvas.style.width = `${window.innerWidth}px`;
      gl.canvas.style.height = `${window.innerHeight}px`;

      if (window.innerHeight / window.innerWidth < imageAspect) {
        a1 = 1;
        a2 = window.innerHeight / window.innerWidth / imageAspect;
      } else {
        a1 = (window.innerWidth / window.innerHeight) * imageAspect;
        a2 = 1;
      }

      aspect = window.innerWidth / window.innerHeight;

      program.uniforms.res.value = new Vec4(
        window.innerWidth,
        window.innerHeight,
        a1,
        a2,
      );

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      uniform float uTime;
      varying vec2 vUv;
      uniform vec4 res;
      uniform vec2 img;

      void main() {
        vec3 flow = texture2D(tFlow, vUv).rgb;
        vec2 uv = 0.5 * gl_FragCoord.xy / res.xy;

        vec2 myUV = (uv - 0.5) * res.zw + 0.5 - flow.xy * 0.18;
        vec2 myUV2 = (uv - 0.5) * res.zw + 0.5 - flow.xy * 0.15;
        vec2 myUV3 = (uv - 0.5) * res.zw + 0.5 - flow.xy * 0.12;

        vec3 tex = texture2D(tWater, myUV).rgb;
        vec3 tex2 = texture2D(tWater, myUV2).rgb;
        vec3 tex3 = texture2D(tWater, myUV3).rgb;

        gl_FragColor = vec4(tex.r, tex2.g, tex3.b, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        tWater: { value: texture },
        res: { value: new Vec4(window.innerWidth, window.innerHeight, a1, a2) },
        img: { value: new Vec2(_size[1], _size[0]) },
        tFlow: flowmap.uniform,
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    window.addEventListener("resize", resize);
    resize();

    const isTouchCapable = "ontouchstart" in window;
    if (isTouchCapable) {
      window.addEventListener("touchstart", updateMouse, false);
      window.addEventListener("touchmove", updateMouse, { passive: false });
    } else {
      window.addEventListener("mousemove", updateMouse, false);
    }

    const lastMouse = new Vec2();
    let lastTime;

    function updateMouse(e) {
      e.preventDefault();
      e.x = e.changedTouches?.[0]?.pageX ?? e.pageX;
      e.y = e.changedTouches?.[0]?.pageY ?? e.pageY;

      mouse.set(e.x / gl.renderer.width, 1 - e.y / gl.renderer.height);

      if (!lastTime) {
        lastTime = performance.now();
        lastMouse.set(e.x, e.y);
      }

      const deltaX = e.x - lastMouse.x;
      const deltaY = e.y - lastMouse.y;

      lastMouse.set(e.x, e.y);

      const time = performance.now();
      const delta = Math.max(10.4, time - lastTime);
      lastTime = time;

      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      velocity.needsUpdate = true;
    }

    const update = (t) => {
      requestAnimationFrame(update);

      if (!velocity.needsUpdate) {
        mouse.set(-1);
        velocity.set(0);
      }

      velocity.needsUpdate = false;

      flowmap.aspect = aspect;
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
      flowmap.update();

      program.uniforms.uTime.value = t * 0.01;
      renderer.render({ scene: mesh });
    };

    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      gl.canvas.remove();
    };
  }, [bgImage]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <div
        className="mask"
        style={{
          position: "absolute",
          zIndex: 2,
          background: "white",
          height: "100vh",
          width: "100vw",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
        dangerouslySetInnerHTML={{ __html: textSVG }}
      />
    </div>
  );
}