export const recommendedActions = [
  {
    id: 'rec-1',
    title: '중복 이미지 132개 정리 제안',
    subtitle: '약 1.2GB 절약 가능',
    color: '#fa8e73',
  },
  {
    id: 'rec-2',
    title: '다운로드 폴더 오래된 파일 정리',
    subtitle: '최근 90일 미사용 파일 54개',
    color: '#c7a58b',
  },
  {
    id: 'rec-3',
    title: '대용량 문서 아카이브 생성',
    subtitle: '협업 문서 보관함으로 이동 추천',
    color: '#8aa7c8',
  },
];

export const recentActivities = [
  { id: 'act-1', text: '사진 정리 시뮬레이션 완료', time: '2시간 전' },
  { id: 'act-2', text: '문서 태그 분류 추천 적용', time: '어제' },
  { id: 'act-3', text: '다운로드 폴더 점검', time: '2일 전' },
];

export const fileItems = [
  {
    id: 'file-1',
    name: '프로젝트 제안서.pdf',
    category: '문서',
    size: '8.4MB',
    modifiedAt: '2026-03-18',
    tags: ['업무', '중요'],
  },
  {
    id: 'file-2',
    name: '여행사진_도쿄_01.jpg',
    category: '이미지',
    size: '5.9MB',
    modifiedAt: '2026-03-17',
    tags: ['개인', '사진'],
  },
  {
    id: 'file-3',
    name: '강의녹음_마케팅.m4a',
    category: '오디오',
    size: '42MB',
    modifiedAt: '2026-03-15',
    tags: ['학습'],
  },
  {
    id: 'file-4',
    name: '디자인시안_v4.psd',
    category: '디자인',
    size: '258MB',
    modifiedAt: '2026-03-12',
    tags: ['업무', '대용량'],
  },
  {
    id: 'file-5',
    name: '제품촬영_샘플_12.png',
    category: '이미지',
    size: '12.1MB',
    modifiedAt: '2026-03-19',
    tags: ['업무', '사진'],
  },
  {
    id: 'file-6',
    name: '회의록_분기전략.docx',
    category: '문서',
    size: '2.4MB',
    modifiedAt: '2026-03-20',
    tags: ['업무'],
  },
  {
    id: 'file-7',
    name: '수면플레이리스트.mp3',
    category: '오디오',
    size: '18MB',
    modifiedAt: '2026-03-10',
    tags: ['개인'],
  },
  {
    id: 'file-8',
    name: '가계부_2026_03.xlsx',
    category: '문서',
    size: '1.1MB',
    modifiedAt: '2026-03-19',
    tags: ['개인'],
  },
  {
    id: 'file-9',
    name: '포트폴리오_썸네일.ai',
    category: '디자인',
    size: '143MB',
    modifiedAt: '2026-03-14',
    tags: ['업무', '대용량'],
  },
  {
    id: 'file-10',
    name: '주말여행_브이로그.mov',
    category: '이미지',
    size: '480MB',
    modifiedAt: '2026-03-18',
    tags: ['개인', '대용량'],
  },
];

export const analysisRecommendations = [
  {
    id: 'ana-1',
    title: '캐시성 파일 주간 정리',
    description: '주 1회 자동 점검으로 저장 공간 급증을 방지하세요.',
  },
  {
    id: 'ana-2',
    title: '대용량 파일 클라우드 이동',
    description: '100MB 이상 파일은 클라우드로 분리하면 탐색 속도가 빨라집니다.',
  },
  {
    id: 'ana-3',
    title: '프로젝트별 태그 통일',
    description: '태그를 통일하면 검색 정확도가 높아집니다.',
  },
];

export const historyItems = [
  {
    id: 'his-1',
    date: '2026-03-18',
    summary: '중복 사진 정리 시뮬레이션',
    changedCount: 132,
    freedSpace: '1.2GB',
  },
  {
    id: 'his-2',
    date: '2026-03-16',
    summary: '문서 태그 일괄 분류',
    changedCount: 48,
    freedSpace: '320MB',
  },
  {
    id: 'his-3',
    date: '2026-03-12',
    summary: '다운로드 폴더 정리',
    changedCount: 57,
    freedSpace: '760MB',
  },
];

export const categoryOptions = ['전체', '문서', '이미지', '오디오', '디자인'];
export const sortOptions = ['최근순', '용량순', '이름순'];
export const filterOptions = ['대용량', '미사용', '즐겨찾기', '태그 있음'];
