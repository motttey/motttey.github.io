(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37777,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:.2,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:30,INITIAL:!0,SPLAT_AMOUNT:5,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3,SPLAT_KEY:"Space",SHADING:!0,COLORFUL:!0,COLOR_UPDATE_SPEED:10,COLOR_PALETTE:[],HOVER:!0,BACK_COLOR:"#000000",TRANSPARENT:!1,BRIGHTNESS:.5,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1},o=[],a=[],n=!1,u=!1,l=!1,c={splats(){o.push(Math.random()*i.SPLAT_AMOUNT*4+i.SPLAT_AMOUNT)},splat(e,t,r,i,o){a.push([e,t,r,i,o])},screenshot(){l=!0},pause(e=!1){n=!n,u=!!e},config(e){Object.assign(i,e)},simulation(e,t={}){var r;let c,v,f,m,s,h,T,E,d,g,A,R,x;function S(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}Object.assign(i,t),ey();let p=[],U=[];p.push(new S);let{gl:D,ext:L}=(T={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},(d=!!(E=(r=e).getContext("webgl2",T)))||(E=r.getContext("webgl",T)||r.getContext("experimental-webgl",T)),d?(E.getExtension("EXT_color_buffer_float"),f=E.getExtension("OES_texture_float_linear")):(v=E.getExtension("OES_texture_half_float"),f=E.getExtension("OES_texture_half_float_linear")),E.clearColor(0,0,0,1),g=d?E.HALF_FLOAT:v.HALF_FLOAT_OES,d?(m=F(E,E.RGBA16F,E.RGBA,g),s=F(E,E.RG16F,E.RG,g),h=F(E,E.R16F,E.RED,g)):(m=F(E,E.RGBA,E.RGBA,g),s=F(E,E.RGBA,E.RGBA,g),h=F(E,E.RGBA,E.RGBA,g)),{gl:E,ext:{formatRGBA:m,formatRG:s,formatR:h,halfFloatTexType:g,supportLinearFiltering:f}});function F(e,t,r,i){var o,a,n,u;let l,c;if(o=e,a=t,n=r,u=i,l=o.createTexture(),o.bindTexture(o.TEXTURE_2D,l),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,a,4,4,0,n,u,null),c=o.createFramebuffer(),o.bindFramebuffer(o.FRAMEBUFFER,c),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,l,0),o.checkFramebufferStatus(o.FRAMEBUFFER)!=o.FRAMEBUFFER_COMPLETE)switch(t){case e.R16F:return F(e,e.RG16F,e.RG,i);case e.RG16F:return F(e,e.RGBA16F,e.RGBA,i);default:return null}return{internalFormat:t,format:r}}function N(e){return Math.min(Math.max(e,0),1)}L.supportLinearFiltering||(i.DYE_RESOLUTION=512,i.SHADING=!1,i.BLOOM=!1,i.SUNRAYS=!1);class O{constructor(e,t){this.uniforms={},this.program=b(e,t),this.uniforms=I(this.program)}bind(){D.useProgram(this.program)}}function b(e,t){let r=D.createProgram();return D.attachShader(r,e),D.attachShader(r,t),D.linkProgram(r),D.getProgramParameter(r,D.LINK_STATUS)||console.trace(D.getProgramInfoLog(r)),r}function I(e){let t=[],r=D.getProgramParameter(e,D.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){let r=D.getActiveUniform(e,i).name;t[r]=D.getUniformLocation(e,r)}return t}function w(e,t,r){t=function(e,t){if(null==t)return e;let r="";return t.forEach(e=>{r+="#define "+e+"\n"}),r+e}(t,r);let i=D.createShader(e);return D.shaderSource(i,t),D.compileShader(i),D.getShaderParameter(i,D.COMPILE_STATUS)||console.trace(D.getShaderInfoLog(i)),i}let B=w(D.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),y=w(D.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),C=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),M=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),Y=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),X=w(D.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),z=w(D.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),P=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,V=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),G=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),Q=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),H=w(D.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),_=w(D.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),K=w(D.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),W=w(D.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,L.supportLinearFiltering?null:["MANUAL_FILTERING"]),k=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),q=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),J=w(D.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),Z=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),j=w(D.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),ee=(D.bindBuffer(D.ARRAY_BUFFER,D.createBuffer()),D.bufferData(D.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),D.STATIC_DRAW),D.bindBuffer(D.ELEMENT_ARRAY_BUFFER,D.createBuffer()),D.bufferData(D.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),D.STATIC_DRAW),D.vertexAttribPointer(0,2,D.FLOAT,!1,0,0),D.enableVertexAttribArray(0),(e,t=!1)=>{null==e?(D.viewport(0,0,D.drawingBufferWidth,D.drawingBufferHeight),D.bindFramebuffer(D.FRAMEBUFFER,null)):(D.viewport(0,0,e.width,e.height),D.bindFramebuffer(D.FRAMEBUFFER,e.fbo)),t&&(D.clearColor(0,0,0,1),D.clear(D.COLOR_BUFFER_BIT)),D.drawElements(D.TRIANGLES,6,D.UNSIGNED_SHORT,0)}),et,er,ei,eo,ea,en,eu,el,ec=(A=D.createTexture(),D.bindTexture(D.TEXTURE_2D,A),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MIN_FILTER,D.LINEAR),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MAG_FILTER,D.LINEAR),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_WRAP_S,D.REPEAT),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_WRAP_T,D.REPEAT),D.texImage2D(D.TEXTURE_2D,0,D.RGB,1,1,0,D.RGB,D.UNSIGNED_BYTE,new Uint8Array([255,255,255])),R={texture:A,width:1,height:1,attach:e=>(D.activeTexture(D.TEXTURE0+e),D.bindTexture(D.TEXTURE_2D,A),e)},(x=new Image).onload=()=>{R.width=x.width,R.height=x.height,D.bindTexture(D.TEXTURE_2D,A),D.texImage2D(D.TEXTURE_2D,0,D.RGB,D.RGB,D.UNSIGNED_BYTE,x)},x.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQKADAAQAAAABAAAAQAAAAABGUUKwAAAeK0lEQVR4AT3aBbRuVdUG4HW5hNLdSHd3CyjdEtLd3Y1wKZHuLgFJRenuBqW7u7tTlu8zx//9ZwwG8J397b3WnG/NtU9bYokl+nfffdf//e9/96uuuqrPN998/ZRTTukbb7xxP/zww/u+++7bf/vb3/YddtihP/roo32SSSbpL7zwQj/99NP7Vltt1X/88ce+8sor13Vvv/12Hzp0aF999dX7Bx980P/617/2WWedtX/55Zd9++237zPMMEP/05/+1DfYYIP+0EMP9amnnrq/9957/ZZbbum//PJLf+yxx/pJJ53URxtttL7WWmv1P//5z/3bb7/t9913X63t9ddf7wsvvHBff/31+6GHHtovu+yyPuecc/YbbrihH3300fXshRZaqF900UW1zv/85z991FFHrfXce++9ffjhh+/nnXdeXe8e7tsuv/zy+vKEE07YDzzwwNpoz4/FPfnkk32VVVbpd911V7/66qv7Mccc0y+99NI+yiij9KWWWqoffPDB/frrr6+HWfjss8/e77jjju6ev/vd72ojNrfiiiv21lo98Pzzz6/fnXjiif0f//hH33rrrWujFr7JJpvU/d5///1+wQUX9N12261PNdVUfbnlluvDDTdc//TTT+vzW2+9tY844oj9q6++6i+++GKffPLJaz3W+fXXX1fx3N/6vv/++3rOG2+8Uc/66KOP+njjjVff22OPPXr7+OOPq4oqftZZZ3VdtLkxxhijX3zxxd0XFGeOOebof/zjH/tee+1VC7nnnnv6uuuuWwt55ZVXqurbbLNNH3fccdWv77333t0innrqqX7QQQf1tddeu3uWh88zzzz9m2++6WONNVZt7txzz61njDTSSP2AAw7oM888c1988cX77bffXgvdaKON+rBhw/oEE0xQKJltttn6Lrvs0k844YS+5ppr9i233LK/8847tTYo23bbbfurr75ahYYQaFUk9/Zd31twwQX7yCOP3JuO6cIzzzxTEJppppmqUzrrc50dMmRIf+211/rPP//cF1lkkeqKToK3ii+66KL98ccf74cddlhfZ511+gMPPNCnnXbavsACC9RGJ5tssv7Pf/6zFrLrrrvWxp5++ulC3DXXXFMFff7557uigjy6TTzxxP3zzz8vNM0999zVHDT6wx/+0H/44Yc+6aST1vXW869//aufccYZfZxxxql1oLIGQp/naQLaLbvssoVkdF9ttdUKTUPcaJZZZmnbbbddW2yxxVoW2rKolg0oTgtn0KTluvbggw+2VVddtWXxLbxvJ598cptuuulaqt/CxxZet2hHW2ONNdr444/fbrrpppYCtUCxhUr1WXShpRMtm2tZaJtxxhlbEFf3iP60LLq+Hzq18Lxlg/X9l156qT3yyCP17JtvvrmFw23eeedtvhO0tf3337+eEU1pKVRbYYUV2hZbbNGuu+46KG/Rl5ZN138HPW333Xdv1tJwRJfxjcDoIjHSAb9bb731+u9///uC0MMPP1y8JnogN+aYY5aYqSYhAm1dG3vssTtagPRRRx3VL7zwwu67BImwTTHFFP1vf/tbJ2r3339/T+H7lFNO+f/d9nkWXx3NQquDUObaaaaZpr/55pt9n332qa6iVZrQ05zSEDq133771f1Qw/OJIo2xt3POOafEkMin+L2BK9VNhfumm25am3rrrbf68ccf36effvp+2223lYh88sknxbtUvT7DJ4W54oor+tlnn103tWgLALt0qzaGYoR0zz337F988UUPKop/xx13XBXYIs8888wqqE0RS4JrU6eeempPt8shUIuKe4Zn0g+/41o777xzv+SSS+q7zz33XLmaooK6vaA1rXj55ZeLvhpMY9wHpDuOuRne/v3vfy9h2nHHHTue//rXv64v4h6r0TkbmWiiiTpx+u9//1uL9eC77767ukjEPJDlsUnCR5zYKx7TC87gc0oNGRBEYzbccMNyH88gnksuuSSKVhe5FEvlNoQN8o499tjSp2WWWaZ0gaYQa41TQAJ+5ZVXlk3TtBtvvLGa9Nlnn5VQN/bA71XYZiyanbAYAsOaQMoiRhhhhE683Cj873PNNVc93Pep/vLLL19dJXooQt0hhig9++yz5QTuwUp15c477ywnIcC+S4/cCxVlCcW3Ps2QP6i3Qi+99NKFsJ9++qlHa6rwHMyawZzS/+pXvypas1CiOfroo1c2WWmllaqAHAXyhqZDw6LmJWpZeEsh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",R),ev=new O(y,C),ef=new O(B,M),em=new O(B,Y),es=new O(B,X),eh=new O(B,z),eT=new O(B,V),eE=new O(B,G),ed=new O(B,Q),eg=new O(B,H),eA=new O(B,_),eR=new O(B,K),ex=new O(B,W),eS=new O(B,k),ep=new O(B,q),eU=new O(B,J),eD=new O(B,Z),eL=new O(B,j),eF=new class{constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(e){let t=0;for(let r=0;r<e.length;r++)t+=function(e){if(0==e.length)return 0;let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return t}(e[r]);let r=this.programs[t];if(null==r){let i=w(D.FRAGMENT_SHADER,this.fragmentShaderSource,e);r=b(this.vertexShader,i),this.programs[t]=r}r!=this.activeProgram&&(this.uniforms=I(r),this.activeProgram=r)}bind(){D.useProgram(this.activeProgram)}}(B,P);function eN(){let e=eQ(i.SIM_RESOLUTION),t=eQ(i.DYE_RESOLUTION),{halfFloatTexType:r,formatRGBA:o,formatRG:a,formatR:n}=L,u=L.supportLinearFiltering?D.LINEAR:D.NEAREST;D.disable(D.BLEND),et=null==et?eb(t.width,t.height,o.internalFormat,o.format,r,u):eI(et,t.width,t.height,o.internalFormat,o.format,r,u),er=null==er?eb(e.width,e.height,a.internalFormat,a.format,r,u):eI(er,e.width,e.height,a.internalFormat,a.format,r,u),ei=eO(e.width,e.height,n.internalFormat,n.format,r,D.NEAREST),eo=eO(e.width,e.height,n.internalFormat,n.format,r,D.NEAREST),ea=eb(e.width,e.height,n.internalFormat,n.format,r,D.NEAREST),function(){let e=eQ(i.BLOOM_RESOLUTION),{halfFloatTexType:t,formatRGBA:r}=L,o=L.supportLinearFiltering?D.LINEAR:D.NEAREST;en=eO(e.width,e.height,r.internalFormat,r.format,t,o),U.length=0;for(let a=0;a<i.BLOOM_ITERATIONS;a++){let i=e.width>>a+1,n=e.height>>a+1;if(i<2||n<2)break;let u=eO(i,n,r.internalFormat,r.format,t,o);U.push(u)}}(),function(){let e=eQ(i.SUNRAYS_RESOLUTION),{halfFloatTexType:t,formatR:r}=L,o=L.supportLinearFiltering?D.LINEAR:D.NEAREST;eu=eO(e.width,e.height,r.internalFormat,r.format,t,o),el=eO(e.width,e.height,r.internalFormat,r.format,t,o)}()}function eO(e,t,r,i,o,a){D.activeTexture(D.TEXTURE0);let n=D.createTexture();D.bindTexture(D.TEXTURE_2D,n),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MIN_FILTER,a),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MAG_FILTER,a),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_WRAP_S,D.CLAMP_TO_EDGE),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_WRAP_T,D.CLAMP_TO_EDGE),D.texImage2D(D.TEXTURE_2D,0,r,e,t,0,i,o,null);let u=D.createFramebuffer();D.bindFramebuffer(D.FRAMEBUFFER,u),D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,n,0),D.viewport(0,0,e,t),D.clear(D.COLOR_BUFFER_BIT);let l=1/e,c=1/t;return{texture:n,fbo:u,width:e,height:t,texelSizeX:l,texelSizeY:c,attach:e=>(D.activeTexture(D.TEXTURE0+e),D.bindTexture(D.TEXTURE_2D,n),e)}}function eb(e,t,r,i,o,a){let n=eO(e,t,r,i,o,a),u=eO(e,t,r,i,o,a);return{width:e,height:t,texelSizeX:n.texelSizeX,texelSizeY:n.texelSizeY,get read(){return n},set read($){n=$},get write(){return u},set write($){u=$},swap(){let e=n;n=u,u=e}}}function eI(e,t,r,i,o,a,n){var u;let l;return e.width==t&&e.height==r?e:(u=e.read,l=eO(t,r,i,o,a,n),ef.bind(),D.uniform1i(ef.uniforms.uTexture,u.attach(0)),ee(l),e.read=l,e.write=eO(t,r,i,o,a,n),e.width=t,e.height=r,e.texelSizeX=1/t,e.texelSizeY=1/r,e)}c=[],i.SHADING&&c.push("SHADING"),i.BLOOM&&c.push("BLOOM"),i.SUNRAYS&&c.push("SUNRAYS"),eF.setKeywords(c),eN(),i.INITIAL&&eM(parseInt(Math.random()*i.SPLAT_AMOUNT*4+i.SPLAT_AMOUNT));let ew=Date.now(),eB=0;function ey(){let t=eH(e.clientWidth),r=eH(e.clientHeight);return(e.width!=t||e.height!=r)&&(e.width=t,e.height=r,!0)}function eC(t){var r,o,a,n,u,l,c,v;i.BLOOM&&function(e,t){if(U.length<2)return;let r=t;D.disable(D.BLEND),eT.bind();let o=i.BLOOM_THRESHOLD*i.BLOOM_SOFT_KNEE+1e-4,a=i.BLOOM_THRESHOLD-o;D.uniform3f(eT.uniforms.curve,a,2*o,.25/o),D.uniform1f(eT.uniforms.threshold,i.BLOOM_THRESHOLD),D.uniform1i(eT.uniforms.uTexture,e.attach(0)),ee(r),eE.bind();for(let e=0;e<U.length;e++){let t=U[e];D.uniform2f(eE.uniforms.texelSize,r.texelSizeX,r.texelSizeY),D.uniform1i(eE.uniforms.uTexture,r.attach(0)),ee(t),r=t}D.blendFunc(D.ONE,D.ONE),D.enable(D.BLEND);for(let e=U.length-2;e>=0;e--){let t=U[e];D.uniform2f(eE.uniforms.texelSize,r.texelSizeX,r.texelSizeY),D.uniform1i(eE.uniforms.uTexture,r.attach(0)),D.viewport(0,0,t.width,t.height),ee(t),r=t}D.disable(D.BLEND),ed.bind(),D.uniform2f(ed.uniforms.texelSize,r.texelSizeX,r.texelSizeY),D.uniform1i(ed.uniforms.uTexture,r.attach(0)),D.uniform1f(ed.uniforms.intensity,i.BLOOM_INTENSITY),ee(t)}(et.read,en),i.SUNRAYS&&(r=et.read,o=et.write,a=eu,D.disable(D.BLEND),eg.bind(),D.uniform1i(eg.uniforms.uTexture,r.attach(0)),ee(o),eA.bind(),D.uniform1f(eA.uniforms.weight,i.SUNRAYS_WEIGHT),D.uniform1i(eA.uniforms.uTexture,o.attach(0)),ee(a),function(e,t,r){ev.bind();for(let r=0;r<1;r++)D.uniform2f(ev.uniforms.texelSize,e.texelSizeX,0),D.uniform1i(ev.uniforms.uTexture,e.attach(0)),ee(t),D.uniform2f(ev.uniforms.texelSize,0,e.texelSizeY),D.uniform1i(ev.uniforms.uTexture,t.attach(0)),ee(e)}(eu,el,1)),null!=t&&i.TRANSPARENT?D.disable(D.BLEND):(D.blendFunc(D.ONE,D.ONE_MINUS_SRC_ALPHA),D.enable(D.BLEND)),i.TRANSPARENT||(l=t,c={r:(u={r:parseInt((n=(n=i.BACK_COLOR).replace("#","")).substr(0,2),16),g:parseInt(n.substr(2,2),16),b:parseInt(n.substr(4,2),16)}).r/255,g:u.g/255,b:u.b/255},es.bind(),D.uniform4f(es.uniforms.color,c.r,c.g,c.b,1),ee(l)),null==t&&i.TRANSPARENT&&(v=t,eh.bind(),D.uniform1f(eh.uniforms.aspectRatio,e.width/e.height),ee(v)),function(e){let t=null==e?D.drawingBufferWidth:e.width,r=null==e?D.drawingBufferHeight:e.height;if(eF.bind(),i.SHADING&&D.uniform2f(eF.uniforms.texelSize,1/t,1/r),D.uniform1i(eF.uniforms.uTexture,et.read.attach(0)),i.BLOOM){var o,a,n;D.uniform1i(eF.uniforms.uBloom,en.attach(1)),D.uniform1i(eF.uniforms.uDithering,ec.attach(2));let e=(o=ec,a=t,n=r,{x:a/o.width,y:n/o.height});D.uniform2f(eF.uniforms.ditherScale,e.x,e.y)}i.SUNRAYS&&D.uniform1i(eF.uniforms.uSunrays,eu.attach(3)),ee(e)}(t)}function eM(e){for(let t=0;t<e;t++){let e=eP();e.r*=10,e.g*=10,e.b*=10,eY(Math.random(),Math.random(),1e3*(Math.random()-.5),1e3*(Math.random()-.5),e)}}function eY(t,r,o,a,n){var u;let l;eR.bind(),D.uniform1i(eR.uniforms.uTarget,er.read.attach(0)),D.uniform1f(eR.uniforms.aspectRatio,e.width/e.height),D.uniform2f(eR.uniforms.point,t,r),D.uniform3f(eR.uniforms.color,o,a,0),D.uniform1f(eR.uniforms.radius,(u=i.SPLAT_RADIUS/100,(l=e.width/e.height)>1&&(u*=l),u)),ee(er.write),er.swap(),D.uniform1i(eR.uniforms.uTarget,et.read.attach(0)),D.uniform3f(eR.uniforms.color,n.r,n.g,n.b),ee(et.write),et.swap()}function eX(t,r,i,o){t.id=r,t.down=!0,t.moved=!1,t.texcoordX=i/e.width,t.texcoordY=1-o/e.height,t.prevTexcoordX=t.texcoordX,t.prevTexcoordY=t.texcoordY,t.deltaX=0,t.deltaY=0,t.color=eP()}function ez(t,r,o){var a,n;let u,l;(t.prevTexcoordX=t.texcoordX,t.prevTexcoordY=t.texcoordY,t.texcoordX=r/e.width,t.texcoordY=1-o/e.height,a=t.texcoordX-t.prevTexcoordX,(u=e.width/e.height)<1&&(a*=u),t.deltaX=a,n=t.texcoordY-t.prevTexcoordY,(l=e.width/e.height)>1&&(n/=l),t.deltaY=n,i.HOVER)?t.moved=Math.abs(t.deltaX)>0||Math.abs(t.deltaY)>0:t.moved=t.down}!function t(){var r,c,v,f,m,s,h,T,E;let d,g,A,R,x,S,U,F,O,b,I,w,B=(g=Math.min(g=((d=Date.now())-ew)/1e3,.016666),ew=d,g);ey()&&eN();r=B,i.COLORFUL&&(eB+=r*i.COLOR_UPDATE_SPEED)>=1&&(c=eB,v=0,eB=0==(A=1)?0:(c-0)%A+0,p.forEach(e=>{e.color=eP()})),function(){if(o.length>0&&eM(o.pop()),a.length>0){let t,r=a.pop(),o=r[0]/e.clientWidth;console.log(o);let n=1-r[1]/e.clientHeight,u=r[2]/2,l=r[3]/2;if(null!=r[4]){let e=eV(r[4]),o=eG(e.h,e.s,i.BRIGHTNESS);o.r*=.15,o.g*=.15,o.b*=.15,t=o}else t=eP();t.r*=10,t.g*=10,t.b*=10,eY(o,n,u,l,t)}p.forEach(e=>{e.moved&&(e.moved=!1,function(e){if(n&&!u)return;let t=e.deltaX*i.SPLAT_FORCE,r=e.deltaY*i.SPLAT_FORCE;eY(e.texcoordX,e.texcoordY,t,r,e.color)}(e))})}(),l&&(eC(b=eO((O=eQ(i.CAPTURE_RESOLUTION)).width,O.height,L.formatRGBA.internalFormat,L.formatRGBA.format,L.halfFloatTexType,D.NEAREST)),T="fluid.png",E=w=(m=function(e,t,r){let i=new Uint8Array(e.length),o=0;for(let a=r-1;a>=0;a--)for(let r=0;r<t;r++){let n=a*t*4+4*r;i[n+0]=255*N(e[o+0]),i[n+1]=255*N(e[o+1]),i[n+2]=255*N(e[o+2]),i[n+3]=255*N(e[o+3]),o+=4}return i}((f=b,D.bindFramebuffer(D.FRAMEBUFFER,f.fbo),R=new Float32Array(f.width*f.height*4),D.readPixels(0,0,f.width,f.height,D.RGBA,D.FLOAT,R),I=R),b.width,b.height),s=b.width,h=b.height,S=(x=document.createElement("canvas")).getContext("2d"),x.width=s,x.height=h,(U=S.createImageData(s,h)).data.set(m),S.putImageData(U,0,0),x).toDataURL(),(F=document.createElement("a")).download=T,F.href=E,document.body.appendChild(F),F.click(),document.body.removeChild(F),URL.revokeObjectURL(w),l=!1),n||function(e){D.disable(D.BLEND),ep.bind(),D.uniform2f(ep.uniforms.texelSize,er.texelSizeX,er.texelSizeY),D.uniform1i(ep.uniforms.uVelocity,er.read.attach(0)),ee(eo),eU.bind(),D.uniform2f(eU.uniforms.texelSize,er.texelSizeX,er.texelSizeY),D.uniform1i(eU.uniforms.uVelocity,er.read.attach(0)),D.uniform1i(eU.uniforms.uCurl,eo.attach(1)),D.uniform1f(eU.uniforms.curl,i.CURL),D.uniform1f(eU.uniforms.dt,e),ee(er.write),er.swap(),eS.bind(),D.uniform2f(eS.uniforms.texelSize,er.texelSizeX,er.texelSizeY),D.uniform1i(eS.uniforms.uVelocity,er.read.attach(0)),ee(ei),em.bind(),D.uniform1i(em.uniforms.uTexture,ea.read.attach(0)),D.uniform1f(em.uniforms.value,i.PRESSURE),ee(ea.write),ea.swap(),eD.bind(),D.uniform2f(eD.uniforms.texelSize,er.texelSizeX,er.texelSizeY),D.uniform1i(eD.uniforms.uDivergence,ei.attach(0));for(let e=0;e<i.PRESSURE_ITERATIONS;e++)D.uniform1i(eD.uniforms.uPressure,ea.read.attach(1)),ee(ea.write),ea.swap();eL.bind(),D.uniform2f(eL.uniforms.texelSize,er.texelSizeX,er.texelSizeY),D.uniform1i(eL.uniforms.uPressure,ea.read.attach(0)),D.uniform1i(eL.uniforms.uVelocity,er.read.attach(1)),ee(er.write),er.swap(),ex.bind(),D.uniform2f(ex.uniforms.texelSize,er.texelSizeX,er.texelSizeY),L.supportLinearFiltering||D.uniform2f(ex.uniforms.dyeTexelSize,er.texelSizeX,er.texelSizeY);let t=er.read.attach(0);D.uniform1i(ex.uniforms.uVelocity,t),D.uniform1i(ex.uniforms.uSource,t),D.uniform1f(ex.uniforms.dt,e),D.uniform1f(ex.uniforms.dissipation,i.VELOCITY_DISSIPATION),ee(er.write),er.swap(),L.supportLinearFiltering||D.uniform2f(ex.uniforms.dyeTexelSize,et.texelSizeX,et.texelSizeY),D.uniform1i(ex.uniforms.uVelocity,er.read.attach(0)),D.uniform1i(ex.uniforms.uSource,et.read.attach(1)),D.uniform1f(ex.uniforms.dissipation,i.DENSITY_DISSIPATION),ee(et.write),et.swap()}(B),eC(null),requestAnimationFrame(t)}();function eP(){let e,t;if(0==i.COLOR_PALETTE.length)e=Math.random(),t=1;else{let r=Math.floor(Math.random()*i.COLOR_PALETTE.length),o=eV(i.COLOR_PALETTE[r]);e=o.h,t=o.s}let r=eG(e,t,i.BRIGHTNESS);return r.r*=.15,r.g*=.15,r.b*=.15,r}function eV(e){let t=parseInt((e=e.replace("#","")).substring(0,2),16)/255,r=parseInt(e.substring(2,4),16)/255,i=parseInt(e.substring(4,6),16)/255,o=Math.max(t,r,i),a=Math.min(t,r,i);return{h:(o===a?0:o===t?((r-i)/(o-a)+6)%6:o===r?(i-t)/(o-a)+2:(t-r)/(o-a)+4)/6,s:0===o?0:(o-a)/o,v:o}}function eG(e,t,r){let i,o,a,n,u,l,c,v;switch(n=Math.floor(6*e),u=6*e-n,l=r*(1-t),c=r*(1-u*t),v=r*(1-(1-u)*t),n%6){case 0:i=r,o=v,a=l;break;case 1:i=c,o=r,a=l;break;case 2:i=l,o=r,a=v;break;case 3:i=l,o=c,a=r;break;case 4:i=v,o=l,a=r;break;case 5:i=r,o=l,a=c}return{r:i,g:o,b:a}}function eQ(e){let t=D.drawingBufferWidth/D.drawingBufferHeight;t<1&&(t=1/t);let r=Math.round(e),i=Math.round(e*t);return D.drawingBufferWidth>D.drawingBufferHeight?{width:i,height:r}:{width:r,height:i}}function eH(e){return Math.floor(e*(window.devicePixelRatio||1))}e.addEventListener("mousedown",e=>{let t=eH(e.offsetX),r=eH(e.offsetY),i=p.find(e=>-1==e.id);null==i&&(i=new S),eX(i,-1,t,r)}),setTimeout(()=>{e.addEventListener("mousemove",e=>{ez(p[0],eH(e.offsetX),eH(e.offsetY))})},500),window.addEventListener("mouseup",()=>{p[0].down=!1}),e.addEventListener("touchstart",e=>{let t=e.targetTouches;for(;t.length>=p.length;)p.push(new S);for(let e=0;e<t.length;e++){let r=eH(t[e].pageX),i=eH(t[e].pageY);eX(p[e+1],t[e].identifier,r,i)}},{passive:!1,capture:!0}),e.addEventListener("touchmove",e=>{let t=e.targetTouches;for(let e=0;e<t.length;e++)ez(p[e+1],eH(t[e].pageX),eH(t[e].pageY))},{passive:!1,capture:!0}),window.addEventListener("touchend",e=>{let t=e.changedTouches;for(let e=0;e<t.length;e++){let r=p.find(r=>r.id==t[e].identifier);null!=r&&(r.down=!1)}}),window.addEventListener("keydown",e=>{e.code===i.SPLAT_KEY&&o.push(parseInt(Math.random()*i.SPLAT_AMOUNT*4+i.SPLAT_AMOUNT))})}};e.s(["default",0,()=>{let e=(0,r.useRef)(null),i=()=>{c.splats()};return(0,r.useEffect)(()=>{let t=e.current;return t&&e.current&&(c.simulation(e.current,{SIM_RESOLUTION:256,HOVER:!1,BLOOM:!1,INITIAL:!0,COLORFUL:!1,DENSITY_DISSIPATION:1.9,VELOCITY_DISSIPATION:2,CURL:10,BACK_COLOR:"#FFFFFF",TRANSPARENT:!1,PRESSURE_ITERATIONS:30,SPLAT_RADIUS:.5,SPLAT_FORCE:5e3,COLOR_PALETTE:["#61dafb","#a8dadc","#457b9d","#1d3557","#f1faee"],SUNRAYS:!1}),t.addEventListener("click",i,{passive:!0})),()=>{t&&t.removeEventListener("click",i)}},[]),(0,t.jsx)("div",{className:"canvas",style:{backgroundColor:"white"},children:(0,t.jsx)("canvas",{id:"fluidCanvas",ref:e,style:{position:"fixed",width:"100vw",height:"100vh",top:0,left:0,opacity:"100%",zIndex:-1}})})}],37777)},61345,e=>{e.n(e.i(37777))}]);