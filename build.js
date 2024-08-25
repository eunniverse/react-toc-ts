const esbuild = require('esbuild');

// Build script
esbuild.build({
    entryPoints: ['./src/index.tsx'],  // 엔트리 파일
    bundle: true,
    minify: true,  // 압축
    sourcemap: true,  // 소스 맵 생성
    platform: 'browser',  // 브라우저용 번들
    target: ['es6'],  // 타겟 환경
    outdir: 'dist',  // 출력 폴더
    external: ['react', 'react-dom'],  // 외부 모듈로 처리할 라이브러리
    format: 'esm',  // ES 모듈 포맷
    jsxFactory: 'React.createElement',  // JSX 변환을 위한 팩토리
    jsxFragment: 'React.Fragment',  // JSX Fragment 변환
}).catch(() => process.exit(1));
