// const oldData = {
//   success: true,
//   message: 'Информация о пользователе получена',
//   data: {
//     id: 1423,
//     email: 'noemail_3072@example.com',
//     name: 'Влад',
//     phone: '+799174367788',
//     bornDate: '1997-09-26T00:00:00.000Z',
//     sex: 'male',
//     createdAt: '2025-03-29T14:31:42.223Z',
//     level: 'Профи',
//     tgId: 5003100894,
//     getcourseId: null,
//     paymentBotId: null,
//     userpic:
//       'https://t.me/i/userpic/320/uDnD8SAXAvwYTy_EsnWuicjYOryNK03zY2-bxDXnzn9GogyZmGEjYaD9xuNa7Glc.svg',
//     debugMode: false,
//     role: 'student',
//     subscriptions: [
//       {
//         id: 1020,
//         userId: 1423,
//         plan: 'Pro',
//         startedAt: '2025-04-30T07:00:00.000Z',
//         expiresAt: '2025-06-09T20:59:00.000Z',
//         orderNumber: null,
//         orderId: 'wua7ubt2THHHYYMepBa0purpl',
//         status: 'active',
//         stream: 1,
//         createdAt: '2025-04-30T07:00:00.000Z',
//       },
//     ],
//   },
// };

export const getUserAdapter = (user) => ({
  born_date: user.bornDate ? user.bornDate.split('T')[0] : null,
  check: true,
  email: user.email || null,
  greet_video_time_view: null,
  id: user.id,
  image: user.userpic || null,
  image_after: null,
  image_before: null,
  last_video: null,
  last_video_duration: null,
  last_video_link: null,
  last_video_time: null,
  name: user.name,
  order_created_at:
    user.subscriptions && user.subscriptions[0]
      ? user.subscriptions[0].startedAt
      : null,
  order_ended_at:
    user.subscriptions && user.subscriptions[0]
      ? user.subscriptions[0].expiresAt
      : null,
  order_id:
    user.subscriptions && user.subscriptions[0]
      ? user.subscriptions[0].orderId
      : null,
  phone: user.phone,
  sex: user.sex,
  tg_id: user.tgId ? String(user.tgId) : null,
  user_level: user.level,
  user_tarif:
    user.subscriptions && user.subscriptions[0]
      ? `Тариф ${user.subscriptions[0].plan}`
      : null,
  subscriptions: user.subscriptions,
});

export const updateUserAdapter = (user) => ({
  name: user?.name,
  bornDate: user.born_date ? new Date(user.born_date).toISOString() : undefined,
  sex: user?.sex,
  level: user?.user_level,
  phone: user?.phone,
});
