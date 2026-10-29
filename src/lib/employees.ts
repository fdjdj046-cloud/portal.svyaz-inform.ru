export type Employee = {
  id: string;
  name: string;
  title: string;
  dept: string;
  email: string;
  phone: string;
  location: string;
  started: string;
  role: "intern" | "admin" | "staff";
  photo: string;
  initials: string;
  bio: string;
};

export const employees: Record<string, Employee> = {
  "1": {
    id: "1",
    name: "Виктор Серов",
    title: "Главный администратор инфраструктуры",
    dept: "Управление информационных систем",
    email: "v.serov@svyaz-inform.ru",
    phone: "+7 495 120-01-01",
    location: "Москва, каб. 401",
    started: "12 марта 2009",
    role: "admin",
    photo: "/images/victor.jpg",
    initials: "ВС",
    bio: "Полный доступ к производственным контурам, каталогу учётных записей и узлам bastion.",
  },
  "105": {
    id: "105",
    name: "Анна Волкова",
    title: "Оператор технической поддержки",
    dept: "Служба технической поддержки",
    email: "a.volkova@svyaz-inform.ru",
    phone: "+7 495 120-88-15",
    location: "Москва, open space 3",
    started: "1 сентября 2026",
    role: "intern",
    photo: "/images/anna.jpg",
    initials: "АВ",
    bio: "Первая линия поддержки. Заявки сотрудников, сброс доступа и служебные контуры смены.",
  },
  "42": {
    id: "42",
    name: "Марина Козлова",
    title: "Руководитель кадрового администрирования",
    dept: "Департамент персонала",
    email: "m.kozlova@svyaz-inform.ru",
    phone: "+7 495 120-22-08",
    location: "Москва, каб. 214",
    started: "4 июня 2016",
    role: "staff",
    photo: "/images/marina.jpg",
    initials: "МК",
    bio: "Ведение карточек сотрудников, отпуска, допуск на территорию.",
  },
  "18": {
    id: "18",
    name: "Павел Еремин",
    title: "Инженер сопровождения",
    dept: "Центр информационных технологий",
    email: "p.eremin@svyaz-inform.ru",
    phone: "+7 495 120-33-19",
    location: "Москва, open space 3",
    started: "19 января 2021",
    role: "staff",
    photo: "/images/pavel.jpg",
    initials: "ПЕ",
    bio: "Смена, мониторинг, заявки на доступ. Без прав на абонентские базы.",
  },
};

export function getEmployee(id: string | undefined | null): Employee {
  if (id && employees[id]) return employees[id];
  return employees["105"];
}
