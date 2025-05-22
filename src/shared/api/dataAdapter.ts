export const getUserParametersAdapter = (parameters) => {
  return parameters.map((item) => ({
    abdominal_circumference: item.abdominalCircumference,
    chest: item.chest,
    created_at: item.createdAt,
    hips: item.hips,
    id: item.id,
    legs: item.legs,
    tg_id: item.userId,
    waist: item.waist,
    weight: item.weight,
  }));
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
