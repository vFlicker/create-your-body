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

export const getUserParametersAdapter = (parameters) => {
  return parameters.map((item) => {
    console.log({ item });

    return {
      abdominal_circumference: item.abdominalCircumference,
      chest: item.chest,
      created_at: item.createdAt,
      hips: item.hips,
      id: item.id,
      legs: item.legs,
      tg_id: item.userId,
      waist: item.waist,
      weight: item.weight,
    };
  });
};

export const addUserParametersAdapter = (parameters) => ({
  waist: parameters.waist,
  legs: parameters.legs,
  weight: parameters.weight,
  chest: parameters.chest,
  abdominalCircumference: parameters.abdominal_circumference,
  hips: parameters.hips,
});

export const updateUserParametersAdapter = (parameters) => ({
  waist: parameters.waist,
  legs: parameters.legs,
  weight: parameters.weight,
  chest: parameters.chest,
  abdominalCircumference: parameters.abdominal_circumference,
  hips: parameters.hips,
});
