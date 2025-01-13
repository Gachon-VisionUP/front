export interface Member {
  department: string;
  team: string;
  id: string;
  name: string;
  hireDate: {
    year: number;
    month: number;
    day: number;
  };
  level: string;
  username: string;
  password: string;
}

const levels = [
  "F1-I", "F1-II",
  "F2-I", "F2-II", "F2-III",
  "F3-I", "F3-II", "F3-III",
  "F4-I", "F4-II", "F4-III",
  "F5"
];

const membersData: Member[] = [
  {
    department: "음성 1센터",
    team: "1",
    id: "2000000",
    name: "박나영",
    hireDate: { year: 2023, month: 1, day: 15 },
    level: "F1-I",
    username: "pny2000",
    password: "password1",
  },
  {
    department: "음성 1센터",
    team: "2",
    id: "2000001",
    name: "김철수",
    hireDate: { year: 2020, month: 9, day: 26 },
    level: "F1-II",
    username: "kcs2001",
    password: "password2",
  },
  {
    department: "음성 2센터",
    team: "1",
    id: "2000002",
    name: "이영희",
    hireDate: { year: 2017, month: 3, day: 10 },
    level: "F2-I",
    username: "lyh2002",
    password: "password3",
  },
  {
    department: "음성 2센터",
    team: "2",
    id: "2000003",
    name: "박정수",
    hireDate: { year: 2018, month: 7, day: 11 },
    level: "F2-II",
    username: "pjs2003",
    password: "password4",
  },
  {
    department: "음성 1센터",
    team: "1",
    id: "2000004",
    name: "최유진",
    hireDate: { year: 2019, month: 6, day: 26 },
    level: "F2-III",
    username: "cyj2004",
    password: "password5",
  },
  {
    department: "음성 1센터",
    team: "2",
    id: "2000005",
    name: "윤지후",
    hireDate: { year: 2021, month: 5, day: 15 },
    level: "F3-I",
    username: "yjh2005",
    password: "password6",
  },
  {
    department: "음성 2센터",
    team: "1",
    id: "2000006",
    name: "장민서",
    hireDate: { year: 2022, month: 7, day: 23 },
    level: "F3-II",
    username: "jms2006",
    password: "password7",
  },
  {
    department: "음성 2센터",
    team: "2",
    id: "2000007",
    name: "정예린",
    hireDate: { year: 2023, month: 8, day: 11 },
    level: "F3-III",
    username: "jyr2007",
    password: "password8",
  },
  {
    department: "음성 1센터",
    team: "1",
    id: "2000008",
    name: "이도윤",
    hireDate: { year: 2019, month: 2, day: 28 },
    level: "F4-I",
    username: "ldy2008",
    password: "password9",
  },
  {
    department: "음성 1센터",
    team: "2",
    id: "2000009",
    name: "김다은",
    hireDate: { year: 2021, month: 8, day: 8 },
    level: "F4-II",
    username: "kde2009",
    password: "password10",
  },
  {
    department: "음성 2센터",
    team: "1",
    id: "2000010",
    name: "홍길동",
    hireDate: { year: 2020, month: 12, day: 13 },
    level: "F4-III",
    username: "hgd2010",
    password: "password11",
  },
  {
    department: "음성 2센터",
    team: "2",
    id: "2000011",
    name: "박서준",
    hireDate: { year: 2019, month: 11, day: 25 },
    level: "F5",
    username: "psj2011",
    password: "password12",
  },
];

export default membersData;
