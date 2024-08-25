import React, { useEffect, useState } from 'react';

// Heading 인터페이스 정의, 각 heading 요소는 id, text, level을 가짐
interface Heading {
    id: string;
    text: string;
    level: number;
}

interface Props {
    textAlign?: string;
    textColor?: string;
    tagList?: string[];
}

const ToC: React.FC = ({textColor='gray', textAlign='right', tagList=['h1','h2','h3']} : Props) => {
    // 상태 변수 정의: headings는 페이지의 모든 h1, h2, h3 요소를 담고 있음
    const [headings, setHeadings] = useState<Heading[]>([]);
    // activeId는 현재 활성화된(강조된) heading의 ID를 저장
    const [activeId, setActiveId] = useState<string>('');
    // isManualScroll은 사용자가 클릭으로 스크롤할 때 true, 자동 스크롤 시 false
    const [isManualScroll, setIsManualScroll] = useState<boolean>(false);

    useEffect(() => {

        // 문서 내 h1, h2, h3 요소를 찾아 배열로 변환 후 headings 상태에 설정
        const elements: Heading[] = Array.from(document.querySelectorAll(tagList.join(', '))).map(
            (element) => {
                // 각 요소에 id가 없으면 고유한 UUID를 생성해 할당
                if (!element.id) {
                    element.id = crypto.randomUUID();
                }
                return {
                    id: element.id,
                    // @ts-ignore: TypeScript 오류 무시
                    text: element.innerText,
                    level: Number(element.tagName[1]), // 태그 이름에서 레벨(1, 2, 3)을 가져옴
                };
            }
        );

        // headings 상태를 업데이트
        setHeadings(elements);

        // 스크롤 이벤트 핸들러 정의
        const handleScroll = () => {
            // 수동 스크롤 중이면 아무 작업도 하지 않음
            if (isManualScroll) return;

            let closestElement: string | null = null;
            let minDistance = Number.MAX_VALUE;

            // 모든 heading 요소를 순회하며 뷰포트에 가장 가까운 요소를 찾음
            elements.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top); // 요소의 top 위치를 기준으로 거리 계산

                    // 뷰포트 안에 있고, 뷰포트 상단에 가까운 요소를 선택
                    if (rect.top > 0 && distance < minDistance) {
                        minDistance = distance;
                        closestElement = heading.id;
                    }
                }
            });

            // 가장 가까운 요소가 현재 활성화된 요소와 다르면 activeId를 업데이트
            if (closestElement && closestElement !== activeId) {
                setActiveId(closestElement);
            }
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 처음 렌더링될 때 현재 스크롤 위치에 맞게 activeId 설정
        handleScroll();

        // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeId, isManualScroll]); // activeId와 isManualScroll이 변경될 때마다 useEffect 실행

    // 링크 클릭 핸들러 정의
    const handleClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // 기본 앵커 동작 막기
        setIsManualScroll(true); // 수동 스크롤 시작 (스크롤 이벤트 비활성화)

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ block: 'start' }); // 클릭된 요소로 부드럽게 스크롤
        }

        // 약간의 딜레이 후에 수동 스크롤 종료 및 activeId 업데이트
        setTimeout(() => {
            setIsManualScroll(false);
            setActiveId(id);
        }, 30); // 30ms 후에 자동 스크롤 재활성화
    };

    return (
        <nav style={{
            // @ts-ignore
            textAlign: textAlign
        }}>
            <ul>
                {headings.map((heading) => (
                    <li
                        key={heading.id} // 각 리스트 아이템의 고유 키 설정
                        style={{
                            marginLeft: (heading.level - 1) * 20, // 레벨에 따라 들여쓰기 조정
                            fontWeight: heading.id === activeId ? 'bold' : 'normal', // activeId와 일치하면 bold 처리
                            color: textColor
                        }}
                    >
                        <a href={`#${heading.id}`} onClick={handleClick(heading.id)} style={{ color: textColor }}>
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default ToC;
