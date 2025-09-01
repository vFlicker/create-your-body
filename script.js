// ================================
// НАСТРОЙКИ РАСЧЕТА BMR (сухая масса тела)
// ================================
const BMR_LEAN_MASS_PERCENTAGES = {
    // ИМТ ≥35: высокий избыточный вес
    highBMI: {
        male: { min: 0.60, max: 0.65 },     // 60-65% сухой массы для мужчин
        female: { min: 0.55, max: 0.60 }    // 55-60% сухой массы для женщин
    },
    // ИМТ 30-35: умеренный избыточный вес  
    moderateBMI: {
        male: { min: 0.70, max: 0.75 },     // 70-75% сухой массы для мужчин
        female: { min: 0.65, max: 0.70 }    // 65-70% сухой массы для женщин
    },
    // ИМТ 25-30: небольшой избыточный вес
    mildBMI: {
        male: { min: 0.80, max: 0.85 },     // 80-85% сухой массы для мужчин
        female: { min: 0.75, max: 0.80 }    // 75-80% сухой массы для женщин
    }
};

// ================================
// ОСНОВНОЙ КОД
// ================================
// Глобальные переменные для хранения данных пользователя
let userData = {
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
    activity: 1,
    goal: '',
    proteinRatio: 1.6,
    fatRatio: 1.0,
    bmr: 0,
    bmrFullWeight: 0, // BMR от полного веса для сравнения
    bmrLeanMass: 0,   // BMR от сухой массы для сравнения
    bmrMethod: '',    // Какой метод используется: 'полный вес' или 'сухая масса'
    totalCalories: 0,
    targetCalories: 0,
    protein: { grams: 0, calories: 0 },
    fat: { grams: 0, calories: 0 },
    carbs: { grams: 0, calories: 0 },
    estimatedFatPercent: 0,
    leanBodyMass: 0,
    isAthlete: false, // Режим спортсмена для расчета БЖУ от полной массы
    debugInfo: {} // Добавляем для отладки
};

let currentStep = 0;
const totalSteps = 7;

// Коэффициенты активности (7 уровней)
const activityCoefficients = [1.2, 1.375, 1.46, 1.55, 1.64, 1.72, 1.9];

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    setupEventListeners();
    loadSavedData();
});

// Настройка обработчиков событий
function setupEventListeners() {
    // Слушатели для формы физических данных
    document.getElementById('age').addEventListener('input', validatePhysicalData);
    document.getElementById('height').addEventListener('input', validatePhysicalData);
    document.getElementById('weight').addEventListener('input', validatePhysicalData);
    
    // Слушатели для карточек активности уже добавлены через onclick в HTML
    
    // Слушатели для ползунков БЖУ
    document.getElementById('proteinSlider').addEventListener('input', updateProteinInfo);
    document.getElementById('fatSlider').addEventListener('input', updateFatInfo);
    
    // Слушатель для ползунка дефицита
    document.getElementById('deficitSlider').addEventListener('input', adjustDeficit);
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('infoModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Переключение режима спортсмена
function toggleAthleteMode() {
    userData.isAthlete = document.getElementById('isAthlete').checked;
    
    // Добавляем/убираем класс для визуального эффекта
    const athleteOption = document.querySelector('.athlete-option');
    if (userData.isAthlete) {
        athleteOption.classList.add('selected');
    } else {
        athleteOption.classList.remove('selected');
    }
    
    // Пересчитываем BMR если данные уже введены
    if (userData.age && userData.height && userData.weight) {
        calculateLeanBodyMass();
        calculateBMR();
        showBMR();
    }
}

// Навигация между шагами
function nextStep() {
    if (currentStep < totalSteps) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateProgressBar();
        
        // Специальные действия для конкретных шагов
        if (currentStep === 7) {
            calculateFinalResults();
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateProgressBar();
    }
}

// Обновление прогресс-бара
function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Шаг ${currentStep + 1} из ${totalSteps + 1}`;
}

// Выбор пола
function selectGender(gender) {
    userData.gender = gender;
    
    // Убираем выделение со всех карточек
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Добавляем выделение к выбранной карточке
    event.target.closest('.option-card').classList.add('selected');
    
    // Активируем кнопку "Далее"
    document.getElementById('step1Next').disabled = false;
}

// Валидация физических данных
function validatePhysicalData() {
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    
    if (age >= 16 && height >= 140 && weight >= 40) {
        userData.age = age;
        userData.height = height;
        userData.weight = weight;
        
        // Сначала рассчитываем сухую массу тела
        calculateLeanBodyMass();
        // Потом BMR от сухой массы
        calculateBMR();
        showBMR();
        document.getElementById('step2Next').disabled = false;
    } else {
        document.getElementById('bmrDisplay').style.display = 'none';
        document.getElementById('step2Next').disabled = true;
    }
}

// Расчёт базового обмена веществ (BMR) 
function calculateBMR() {
    // Расчёт BMR от полного веса (для сравнения) - формула Миффлина-Сан Жеора
    const bmrFromFullWeight = userData.gender === 'male' ?
        (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5 :
        (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    
    // Расчёт BMR от сухой массы тела
    const bmrFromLeanMass = userData.gender === 'male' ?
        (10 * userData.leanBodyMass) + (6.25 * userData.height) - (5 * userData.age) + 5 :
        (10 * userData.leanBodyMass) + (6.25 * userData.height) - (5 * userData.age) - 161;
    
    userData.bmrFullWeight = Math.round(bmrFromFullWeight);
    userData.bmrLeanMass = Math.round(bmrFromLeanMass);
    
    // Выбор BMR в зависимости от ИМТ
    const bmi = userData.debugInfo.bmi;
    if (bmi < 25) {
        // Для нормального ИМТ используем BMR от полного веса
        userData.bmr = userData.bmrFullWeight;
        userData.bmrMethod = 'полный вес';
    } else {
        // Для избыточного веса используем BMR от сухой массы
        userData.bmr = userData.bmrLeanMass;
        userData.bmrMethod = 'сухая масса';
    }
}

// Расчёт сухой массы тела (новый подход)
function calculateLeanBodyMass() {
    const bmi = userData.weight / ((userData.height / 100) ** 2);
    
    let leanBodyMassPercent;
    let debugInfo = {
        bmi: Math.round(bmi),
        estimationMethod: '',
        range: '',
        fatPercent: 0
    };
    
    // Диапазонное приближение для сухой массы тела в зависимости от ИМТ
    if (bmi >= 35) {
        // При высоком ИМТ: используем среднее значение диапазона
        const range = userData.gender === 'male' ? 
            BMR_LEAN_MASS_PERCENTAGES.highBMI.male : 
            BMR_LEAN_MASS_PERCENTAGES.highBMI.female;
        leanBodyMassPercent = (range.min + range.max) / 2;
        
        debugInfo.estimationMethod = 'диапазонное приближение';
        debugInfo.range = `${Math.round(range.min * 100)}-${Math.round(range.max * 100)}% (среднее: ${Math.round(leanBodyMassPercent * 100)}%)`;
        debugInfo.fatPercent = Math.round((1 - leanBodyMassPercent) * 100);
        
    } else if (bmi >= 30) {
        // При умеренном избытке: используем среднее значение диапазона
        const range = userData.gender === 'male' ? 
            BMR_LEAN_MASS_PERCENTAGES.moderateBMI.male : 
            BMR_LEAN_MASS_PERCENTAGES.moderateBMI.female;
        leanBodyMassPercent = (range.min + range.max) / 2;
        
        debugInfo.estimationMethod = 'диапазонное приближение';
        debugInfo.range = `${Math.round(range.min * 100)}-${Math.round(range.max * 100)}% (среднее: ${Math.round(leanBodyMassPercent * 100)}%)`;
        debugInfo.fatPercent = Math.round((1 - leanBodyMassPercent) * 100);
        
    } else if (bmi >= 25) {
        // При небольшом избытке: используем среднее значение диапазона
        const range = userData.gender === 'male' ? 
            BMR_LEAN_MASS_PERCENTAGES.mildBMI.male : 
            BMR_LEAN_MASS_PERCENTAGES.mildBMI.female;
        leanBodyMassPercent = (range.min + range.max) / 2;
        
        debugInfo.estimationMethod = 'диапазонное приближение';
        debugInfo.range = `${Math.round(range.min * 100)}-${Math.round(range.max * 100)}% (среднее: ${Math.round(leanBodyMassPercent * 100)}%)`;
        debugInfo.fatPercent = Math.round((1 - leanBodyMassPercent) * 100);
        
    } else {
        // Для нормального ИМТ
        if (bmi < 18) {
            // Для людей с недостаточным весом - минимальные проценты жира
            if (userData.gender === 'male') {
                // Мужчины: 8-10% жира (90-92% сухой массы)
                const fatPercent = 9; // Среднее между 8-10%
                leanBodyMassPercent = 1 - (fatPercent / 100); // 91%
                
                debugInfo.estimationMethod = 'минимум для недостаточного веса (мужчина)';
                debugInfo.range = `91% сухой массы (9% жира)`;
                debugInfo.fatPercent = Math.round(fatPercent);
            } else {
                // Женщины: 12-14% жира (86-88% сухой массы)
                const fatPercent = 13; // Среднее между 12-14%
                leanBodyMassPercent = 1 - (fatPercent / 100); // 87%
                
                debugInfo.estimationMethod = 'минимум для недостаточного веса (женщина)';
                debugInfo.range = `87% сухой массы (13% жира)`;
                debugInfo.fatPercent = Math.round(fatPercent);
            }
        } else if (bmi < 23 && userData.age < 35) {
            // Для молодых стройных людей - фиксированные минимальные проценты жира
            if (userData.gender === 'male') {
                // Мужчины: 10-12% жира (88-90% сухой массы)
                const fatPercent = 11; // Среднее между 10-12%
                leanBodyMassPercent = 1 - (fatPercent / 100); // 89%
                
                debugInfo.estimationMethod = 'фиксированный минимум (молодой/стройный мужчина)';
                debugInfo.range = `89% сухой массы (11% жира)`;
                debugInfo.fatPercent = Math.round(fatPercent);
            } else {
                // Женщины: 15-16% жира (84-85% сухой массы)
                const fatPercent = 15; // Среднее между 15-16%
                leanBodyMassPercent = 1 - (fatPercent / 100); // 85%
                
                debugInfo.estimationMethod = 'фиксированный минимум (молодая/стройная женщина)';
                debugInfo.range = `85% сухой массы (15% жира)`;
                debugInfo.fatPercent = Math.round(fatPercent);
            }
        } else {
            // Для остальных случаев нормального ИМТ: используем формулу с нижним пределом 75%
            const sexCoef = (userData.gender === 'male') ? 1 : 0;
            const estimatedFat = 1.2 * bmi + 0.23 * userData.age - 10.8 * sexCoef - 5.4;
            const fatPercent = Math.max(8, Math.min(estimatedFat, 25));
            leanBodyMassPercent = Math.max(0.75, 1 - (fatPercent / 100)); // Минимум 75% сухой массы
            
            debugInfo.estimationMethod = 'формула + нижний предел';
            debugInfo.range = `минимум 75% сухой массы`;
            debugInfo.fatPercent = Math.round((1 - leanBodyMassPercent) * 100);
        }
    }

    // Рассчитываем сухую массу тела
    userData.leanBodyMass = userData.weight * leanBodyMassPercent;
    userData.estimatedFatPercent = debugInfo.fatPercent;
    userData.debugInfo = debugInfo;
}

// Отображение BMR и дополнительной информации
function showBMR() {
    document.getElementById('bmrValue').textContent = userData.bmr;
    
    // Добавляем информацию о сухой массе тела и сравнении BMR
    const leanMassInfo = document.getElementById('leanMassInfo');
    if (leanMassInfo) {
        const debugInfo = userData.debugInfo;
        let methodExplanation = '';
        let adaptationNote = '';
        
        if (debugInfo.bmi < 25) {
            methodExplanation = `
            <div class="method-explanation normal-bmi">
                <strong>✅ Используется BMR от полного веса</strong><br>
                При нормальном ИМТ коррекция не нужна - используем стандартный расчет.
            </div>`;
        } else {
            methodExplanation = `
            <div class="method-explanation high-bmi">
                <strong>⚖️ Используется BMR от сухой массы</strong><br>
                При избыточном весе BMR от полного веса завышается, т.к. жировая ткань менее активна.
            </div>`;
        }
        
        leanMassInfo.innerHTML = `
            <h4>🧮 Детали расчёта:</h4>
            <p><strong>ИМТ:</strong> ${debugInfo.bmi} (${getBMICategory(debugInfo.bmi)})</p>
            <p><strong>Оценка % жира:</strong> ${debugInfo.fatPercent}% (${debugInfo.estimationMethod})</p>
            <p><strong>Диапазон сухой массы:</strong> ${debugInfo.range}</p>
            <p><strong>Сухая масса тела:</strong> ${userData.leanBodyMass.toFixed(1)} кг</p>
            
            ${methodExplanation}
            
            <div class="bmr-comparison">
                <p><strong>BMR от полного веса:</strong> ${userData.bmrFullWeight} ккал</p>
                <p><strong>BMR от сухой массы:</strong> ${userData.bmrLeanMass} ккал</p>
                <p class="used-bmr"><strong>Используется:</strong> ${userData.bmr} ккал (от ${userData.bmrMethod})</p>
            </div>
            
            <div class="info-blocks">
                <div class="info-block-small">
                    <strong>📊 Что такое ИМТ:</strong><br>
                    Индекс массы тела = вес(кг) ÷ рост²(м). Показывает соотношение веса к росту.
                    <br>Норма: 18.5-24.9, избыток: 25-29.9, ожирение: ≥30
                </div>
                
                <div class="info-block-small">
                    <strong>🔥 Что такое BMR:</strong><br>
                    Базовый метаболизм — калории, которые тратятся даже в полном покое (дыхание, работа органов).
                    <br>Суточная потребность = BMR × уровень активности
                </div>
            </div>
        `;
    }
    
    document.getElementById('bmrDisplay').style.display = 'block';
}

// Определение категории ИМТ
function getBMICategory(bmi) {
    if (bmi < 18.5) return 'недостаток веса';
    if (bmi < 25) return 'норма';
    if (bmi < 30) return 'избыточный вес';
    return 'ожирение';
}

// Выбор уровня активности
function selectActivity(activityLevel) {
    userData.activity = activityLevel;
    
    // Убираем выделение со всех карточек
    document.querySelectorAll('.activity-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Добавляем выделение к выбранной карточке и отмечаем радио
    const selectedCard = document.querySelector(`.activity-card:nth-child(${activityLevel + 1})`);
    selectedCard.classList.add('selected');
    document.getElementById(`activity${activityLevel}`).checked = true;
    
    // Расчёт общих калорий
    if (userData.bmr > 0) {
        const coefficient = activityCoefficients[activityLevel];
        userData.totalCalories = Math.round(userData.bmr * coefficient);
        
        // Обновляем отображение
        document.getElementById('totalCalories').textContent = userData.totalCalories;
        document.getElementById('bmrCalories').textContent = userData.bmr;
        document.getElementById('selectedCoef').textContent = coefficient;
        document.getElementById('caloriesDisplay').style.display = 'block';
    }
}

// Выбор цели
function selectGoal(goal) {
    userData.goal = goal;
    
    // Убираем выделение со всех карточек
    document.querySelectorAll('.goal-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Добавляем выделение к выбранной карточке
    event.target.closest('.goal-card').classList.add('selected');
    
    // Расчёт целевых калорий
    calculateTargetCalories();
    showTargetCalories();
    showDeficitAdjuster(); // Показываем блок дефицита только для похудения
    
    // Активируем кнопку "Далее"
    document.getElementById('step4Next').disabled = false;
}

// Расчёт целевых калорий в зависимости от цели
function calculateTargetCalories() {
    switch (userData.goal) {
        case 'deficit':
            userData.targetCalories = Math.round(userData.totalCalories * 0.85); // -15%
            break;
        case 'maintain':
            userData.targetCalories = userData.totalCalories;
            break;
        case 'surplus':
            userData.targetCalories = Math.round(userData.totalCalories * 1.15); // +15%
            break;
    }
}

// Отображение целевых калорий
function showTargetCalories() {
    document.getElementById('targetCalories').textContent = userData.targetCalories;
    document.getElementById('goalCalories').style.display = 'block';
}

// Обновление информации о белках
function updateProteinInfo() {
    const proteinRatio = parseFloat(document.getElementById('proteinSlider').value);
    userData.proteinRatio = proteinRatio;
    
    document.getElementById('proteinValue').textContent = proteinRatio === 0 ? 'Выкл' : proteinRatio;
    
    // Рассчитываем только если есть данные о весе и белки не выключены
    // Для спортсменов используем полную массу тела, для остальных - сухую массу
    const baseWeight = userData.isAthlete ? userData.weight : (userData.leanBodyMass || userData.weight);
    if (baseWeight && proteinRatio > 0) {
        const proteinGrams = Math.round(baseWeight * proteinRatio);
        const proteinCalories = proteinGrams * 4;
        
        userData.protein.grams = proteinGrams;
        userData.protein.calories = proteinCalories;
        
        // Обновляем основные значения
        document.getElementById('proteinGrams').textContent = proteinGrams;
        document.getElementById('proteinCalories').textContent = proteinCalories;
        
        // Рассчитываем процент от рациона
        const targetCal = userData.targetCalories || (userData.totalCalories * 0.85); // примерная цель
        const proteinPercent = Math.round((proteinCalories / targetCal) * 100);
        
        // Показываем детальный результат
        document.getElementById('proteinPercent').textContent = proteinPercent;
        document.getElementById('proteinResultDetailed').style.display = 'block';
        
        // Показываем оценку белков
        evaluateProteinStep(proteinRatio);
        document.getElementById('proteinEvaluationStep').style.display = 'block';
        
    } else if (proteinRatio === 0) {
        userData.protein.grams = 0;
        userData.protein.calories = 0;
        document.getElementById('proteinGrams').textContent = '0';
        document.getElementById('proteinCalories').textContent = '0';
        document.getElementById('proteinResultDetailed').style.display = 'none';
        document.getElementById('proteinEvaluationStep').style.display = 'none';
    } else {
        document.getElementById('proteinResultDetailed').style.display = 'none';
        document.getElementById('proteinEvaluationStep').style.display = 'none';
    }
}

// Обновление информации о жирах
function updateFatInfo() {
    const fatRatio = parseFloat(document.getElementById('fatSlider').value);
    userData.fatRatio = fatRatio;
    
    document.getElementById('fatValue').textContent = fatRatio === 0 ? 'Выкл' : fatRatio;
    
    // Рассчитываем только если есть данные о весе и жиры не выключены
    // Для спортсменов используем полную массу тела, для остальных - сухую массу
    const baseWeight = userData.isAthlete ? userData.weight : (userData.leanBodyMass || userData.weight);
    if (baseWeight && fatRatio > 0) {
        const fatGrams = Math.round(baseWeight * fatRatio);
        const fatCalories = fatGrams * 9;
        
        userData.fat.grams = fatGrams;
        userData.fat.calories = fatCalories;
        
        // Обновляем основные значения
        document.getElementById('fatGrams').textContent = fatGrams;
        document.getElementById('fatCalories').textContent = fatCalories;
        
        // Рассчитываем процент от рациона
        const targetCal = userData.targetCalories || (userData.totalCalories * 0.85); // примерная цель
        const fatPercent = Math.round((fatCalories / targetCal) * 100);
        
        // Показываем детальный результат
        document.getElementById('fatPercent').textContent = fatPercent;
        document.getElementById('fatResultDetailed').style.display = 'block';
        
        // Показываем оценку жиров
        evaluateFatStep(fatRatio);
        document.getElementById('fatEvaluationStep').style.display = 'block';
        
    } else if (fatRatio === 0) {
        userData.fat.grams = 0;
        userData.fat.calories = 0;
        document.getElementById('fatGrams').textContent = '0';
        document.getElementById('fatCalories').textContent = '0';
        document.getElementById('fatResultDetailed').style.display = 'none';
        document.getElementById('fatEvaluationStep').style.display = 'none';
    } else {
        document.getElementById('fatResultDetailed').style.display = 'none';
        document.getElementById('fatEvaluationStep').style.display = 'none';
    }
}

// Расчёт финальных результатов
function calculateFinalResults() {
    // Обновляем белки и жиры
    updateProteinInfo();
    updateFatInfo();
    
    // Рассчитываем углеводы по остаточному принципу
    const remainingCalories = userData.targetCalories - userData.protein.calories - userData.fat.calories;
    const carbGrams = Math.max(0, Math.round(remainingCalories / 4));
    const carbCalories = carbGrams * 4;
    
    userData.carbs.grams = carbGrams;
    userData.carbs.calories = carbCalories;
    
    // Отображаем результаты
    displayFinalResults();
    createVisualization();
    
    // Сохраняем данные
    saveUserData();
}

// Отображение финальных результатов и инициализация интерактивных элементов
function displayFinalResults() {
    // Устанавливаем начальные значения ползунков
    document.getElementById('finalProteinSlider').value = userData.proteinRatio;
    document.getElementById('finalFatSlider').value = userData.fatRatio;
    
    // Обновляем отображение
    adjustMacros();
    
    // Отображаем техническую формулу
    displayTechnicalFormula();
}

// Интерактивная настройка макронутриентов
function adjustMacros() {
    const proteinRatio = parseFloat(document.getElementById('finalProteinSlider').value);
    const fatRatio = parseFloat(document.getElementById('finalFatSlider').value);
    
    // Обновляем отображение значений
    document.getElementById('finalProteinValue').textContent = proteinRatio.toFixed(1);
    document.getElementById('finalFatValue').textContent = fatRatio.toFixed(1);
    
    // Рассчитываем граммы и калории
    // Для спортсменов используем полную массу тела, для остальных - сухую массу
    const baseWeight = userData.isAthlete ? userData.weight : (userData.leanBodyMass || userData.weight);
    
    const proteinGrams = Math.round(baseWeight * proteinRatio);
    const proteinCalories = proteinGrams * 4;
    
    const fatGrams = Math.round(baseWeight * fatRatio);
    const fatCalories = fatGrams * 9;
    
    // Углеводы по остатку (минимум 30г для базовых функций мозга)
    const remainingCalories = userData.targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.max(30, Math.round(remainingCalories / 4));
    const carbCalories = carbGrams * 4;
    
    // Обновляем отображение
    document.getElementById('finalProteinGrams').textContent = proteinGrams;
    document.getElementById('finalProteinCal').textContent = proteinCalories;
    
    document.getElementById('finalFatGrams').textContent = fatGrams;
    document.getElementById('finalFatCal').textContent = fatCalories;
    
    document.getElementById('finalCarbGrams').textContent = carbGrams;
    document.getElementById('finalCarbCal').textContent = carbCalories;
    
    // Обновляем read-only ползунок углеводов
    const carbRatio = baseWeight > 0 ? carbGrams / baseWeight : 0;
    document.getElementById('finalCarbValue').textContent = carbRatio.toFixed(1);
    document.getElementById('finalCarbSlider').value = Math.min(carbRatio, 8); // Ограничиваем максимумом ползунка
    
    const totalCal = proteinCalories + fatCalories + carbCalories;
    document.getElementById('finalTotalCal').textContent = totalCal;
    
    // Обновляем визуализацию
    updateMacroVisualization(proteinCalories, fatCalories, carbCalories);
    
    // Показываем индивидуальные оценки макронутриентов
    showMacroEvaluations(proteinRatio, fatRatio, carbGrams, totalCal);
}

// Обновление визуализации БЖУ
function updateMacroVisualization(proteinCal, fatCal, carbCal) {
    const totalCal = proteinCal + fatCal + carbCal;
    
    const proteinPercent = (proteinCal / totalCal) * 100;
    const fatPercent = (fatCal / totalCal) * 100;
    const carbPercent = (carbCal / totalCal) * 100;
    
    // Обновляем ширину сегментов
    document.getElementById('proteinSegment').style.width = proteinPercent + '%';
    document.getElementById('fatSegment').style.width = fatPercent + '%';
    document.getElementById('carbSegment').style.width = carbPercent + '%';
    
    // Добавляем текст с процентами и значениями в сегменты
    const proteinGrams = Math.round(proteinCal / 4);
    const fatGrams = Math.round(fatCal / 9);
    const carbGrams = Math.round(carbCal / 4);
    
    // Показываем текст только если сегмент достаточно широкий (>15%)
    document.getElementById('proteinSegment').innerHTML = proteinPercent > 15 ? 
        `<span class="segment-text">${proteinPercent.toFixed(0)}%<br>${proteinGrams}г</span>` : '';
    document.getElementById('fatSegment').innerHTML = fatPercent > 15 ? 
        `<span class="segment-text">${fatPercent.toFixed(0)}%<br>${fatGrams}г</span>` : '';
    document.getElementById('carbSegment').innerHTML = carbPercent > 15 ? 
        `<span class="segment-text">${carbPercent.toFixed(0)}%<br>${carbGrams}г</span>` : '';
}

// Индивидуальные оценки макронутриентов
function showMacroEvaluations(proteinRatio, fatRatio, carbGrams, totalCal) {
    evaluateProtein(proteinRatio);
    evaluateFat(fatRatio);
    evaluateCarbs(carbGrams);
    evaluateTotal(totalCal);
}

// Оценка белков
function evaluateProtein(proteinRatio) {
    const proteinDiv = document.getElementById('proteinEvaluation');
    const titleElement = document.getElementById('proteinEvalTitle');
    const textElement = document.getElementById('proteinEvalText');
    
    let title, text, className;
    
    if (proteinRatio < 1.0) {
        title = "Критически мало";
        text = "Крайне низкое потребление белка. Может привести к серьёзной потере мышечной массы, слабости и проблемам с иммунитетом.";
        className = "danger";
    } else if (proteinRatio < 1.2) {
        title = "Ниже минимума";
        text = "Недостаточно для поддержания мышечной массы. Минимальная рекомендация ВОЗ — 1.2 г/кг для взрослых.";
        className = "warning";
    } else if (proteinRatio >= 1.2 && proteinRatio < 1.4) {
        title = "Минимальная норма";
        text = "Подходит для малоподвижных людей без спортивных целей. Достаточно для поддержания базовых функций организма.";
        className = "good";
    } else if (proteinRatio >= 1.4 && proteinRatio < 1.8) {
        title = "Оптимальная норма";
        text = "Отлично! Идеально для активных людей и тех, кто хочет поддерживать мышечную массу. Рекомендуется большинству.";
        className = "excellent";
    } else if (proteinRatio >= 1.8 && proteinRatio < 2.2) {
        title = "Повышенная норма";
        text = "Хорошо для тех, кто активно тренируется. Поможет в восстановлении после тренировок и наборе мышечной массы.";
        className = "excellent";
    } else if (proteinRatio >= 2.2 && proteinRatio < 2.5) {
        title = "Спортивная норма";
        text = "Подходит для интенсивно тренирующихся спортсменов и людей на строгой диете. Максимум для роста мышц.";
        className = "good";
    } else {
        title = "Избыточное потребление";
        text = "Более 2.5 г/кг не даёт дополнительных преимуществ и может создать нагрузку на почки. Лучше перераспределить калории.";
        className = "warning";
    }
    
    titleElement.textContent = title;
    textElement.textContent = text;
    proteinDiv.className = `macro-evaluation protein-eval ${className}`;
}

// Оценка жиров
function evaluateFat(fatRatio) {
    const fatDiv = document.getElementById('fatEvaluation');
    const titleElement = document.getElementById('fatEvalTitle');
    const textElement = document.getElementById('fatEvalText');
    
    let title, text, className;
    
    if (fatRatio < 0.5) {
        title = "Критически мало";
        text = "Опасно низкое потребление жиров. Серьёзный риск гормональных нарушений и дефицита жирорастворимых витаминов.";
        className = "danger";
    } else if (fatRatio < 0.7) {
        title = "Ниже минимума";
        text = "Недостаточно для нормальной выработки гормонов. Может привести к снижению тестостерона и проблемам с кожей.";
        className = "warning";
    } else if (fatRatio >= 0.7 && fatRatio < 0.9) {
        title = "Минимальная норма";
        text = "Подходит для строгих диет, но лучше увеличить до 1.0 г/кг для оптимального гормонального баланса.";
        className = "good";
    } else if (fatRatio >= 0.9 && fatRatio < 1.3) {
        title = "Оптимальная норма";
        text = "Отлично! Обеспечивает нормальную выработку гормонов, усвоение витаминов и здоровье кожи. Золотая середина.";
        className = "excellent";
    } else if (fatRatio >= 1.3 && fatRatio < 1.6) {
        title = "Повышенная норма";
        text = "Хорошо для тех, кто предпочитает жирную пищу или набирает массу. Может замедлить похудение из-за калорийности, но безопасно.";
        className = "good";
    } else if (fatRatio >= 1.6 && fatRatio < 2.0) {
        title = "Высокое потребление";
        text = "Очень много жиров. Затрудняет дефицит калорий, может вызвать вялость после еды, замедлить пищеварение и ухудшить результаты тренировок.";
        className = "warning";
    } else {
        title = "Критический избыток";
        text = "Экстремально высокое потребление жиров! Риск: набор жировой массы, проблемы с ЖКТ, вялость, плохая переносимость тренировок, нарушение усвоения других нутриентов.";
        className = "danger";
    }
    
    titleElement.textContent = title;
    textElement.textContent = text;
    fatDiv.className = `macro-evaluation fat-eval ${className}`;
}

// Оценка углеводов
function evaluateCarbs(carbGrams) {
    const carbDiv = document.getElementById('carbEvaluation');
    const titleElement = document.getElementById('carbEvalTitle');
    const textElement = document.getElementById('carbEvalText');
    
    let title, text, className;
    
    if (carbGrams < 30) {
        title = "Кетогенный режим";
        text = "Экстремально низкое потребление углеводов. Подходит для кето-диеты, но требует медицинского наблюдения и адаптации.";
        className = "warning";
    } else if (carbGrams < 50) {
        title = "Очень низкоуглеводный";
        text = "Может быть эффективно для быстрого похудения, но следите за уровнем энергии. Мозгу нужно ~120г глюкозы в день.";
        className = "warning";
    } else if (carbGrams >= 50 && carbGrams < 100) {
        title = "Низкоуглеводный режим";
        text = "Умеренно низкие углеводы. Хорошо для похудения, но может влиять на интенсивность тренировок и концентрацию.";
        className = "good";
    } else if (carbGrams >= 100 && carbGrams < 200) {
        title = "Умеренное потребление";
        text = "Сбалансированное количество углеводов. Обеспечивает энергию для мозга и тренировок без избытка.";
        className = "good";
    } else if (carbGrams >= 200 && carbGrams < 300) {
        title = "Достаточное потребление";
        text = "Отлично! Хорошее количество для активных людей. Обеспечивает энергию для интенсивных тренировок и восстановления.";
        className = "excellent";
    } else if (carbGrams >= 300 && carbGrams < 400) {
        title = "Высокое потребление";
        text = "Подходит для очень активных людей, спортсменов на наборе массы или тех, кто много тренируется на выносливость.";
        className = "good";
    } else if (carbGrams >= 400 && carbGrams < 500) {
        title = "Очень высокое потребление";
        text = "Большое количество углеводов. Риск набора жира при недостатке активности, возможны скачки сахара в крови и энергетические качели.";
        className = "warning";
    } else {
        title = "Критический избыток";
        text = "Экстремально много углеводов! Риск: быстрый набор жировой массы, инсулинорезистентность, постоянные скачки энергии, ухудшение композиции тела, проблемы с контролем аппетита.";
        className = "danger";
    }
    
    titleElement.textContent = title;
    textElement.textContent = text;
    carbDiv.className = `macro-evaluation carb-eval ${className}`;
}

// Оценка общей калорийности
function evaluateTotal(totalCal) {
    const totalDiv = document.getElementById('totalEvaluation');
    const titleElement = document.getElementById('totalEvalTitle');
    const textElement = document.getElementById('totalEvalText');
    
    let title, text, className;
    
    const targetCal = userData.targetCalories;
    const diff = totalCal - targetCal;
    const diffPercent = (diff / targetCal) * 100;
    
    if (diffPercent < -20) {
        title = "Слишком низкая калорийность";
        text = `На ${Math.abs(Math.round(diff))} ккал ниже цели. Риск замедления метаболизма, потери мышечной массы и срывов в питании.`;
        className = "danger";
    } else if (diffPercent < -10) {
        title = "Ниже целевой калорийности";
        text = `На ${Math.abs(Math.round(diff))} ккал ниже цели. Может ускорить похудение, но следите за самочувствием и энергией.`;
        className = "warning";
    } else if (diffPercent >= -10 && diffPercent <= 10) {
        title = "Точно в цели";
        text = `Отлично! Калорийность соответствует вашей цели (${userData.goal === 'deficit' ? 'дефицит для похудения' : userData.goal === 'surplus' ? 'избыток для набора массы' : 'поддержание веса'}).`;
        className = "excellent";
    } else if (diffPercent > 10 && diffPercent <= 20) {
        title = "Выше целевой калорийности";
        text = `На ${Math.round(diff)} ккал выше цели. ${userData.goal === 'deficit' ? 'Это может замедлить похудение.' : 'Может ускорить набор веса, но следите за качеством прибавки.'}`;
        className = "warning";
    } else {
        title = "Значительно выше цели";
        text = `На ${Math.round(diff)} ккал выше цели. ${userData.goal === 'deficit' ? 'При таких значениях дефицит может превратиться в избыток калорий!' : 'Слишком быстрый набор веса может увеличить долю жира.'}`;
        className = "danger";
    }
    
    titleElement.textContent = title;
    textElement.textContent = text;
    totalDiv.className = `macro-evaluation total-eval ${className}`;
}

// Отображение технической формулы расчёта
function displayTechnicalFormula() {
    const genderAdj = userData.gender === 'male' ? '+5' : '-161';
    const activityCoef = activityCoefficients[userData.activity];
    const goalText = userData.goal === 'deficit' ? `×${(1 - document.getElementById('deficitSlider').value / 100).toFixed(2)}` : 
                     userData.goal === 'surplus' ? '×1.15' : '×1.0';
    const debugInfo = userData.debugInfo;
    
    const bmrMethodText = debugInfo.bmi < 25 ? 
        `ИСПОЛЬЗОВАН BMR от полного веса (ИМТ < 25, коррекция не нужна)` :
        `ИСПОЛЬЗОВАН BMR от сухой массы (ИМТ ≥ 25, коррекция для избыточного веса)`;
    
    const formulaText = `
📊 Техническая формула расчёта:

ШАГ 1: ИМТ = ${userData.weight} ÷ (${(userData.height/100).toFixed(2)})² = ${debugInfo.bmi}

ШАГ 2: Сухая масса тела (${debugInfo.estimationMethod})
${debugInfo.range}
Сухая масса = ${userData.leanBodyMass.toFixed(1)} кг (${Math.round((userData.leanBodyMass / userData.weight) * 100)}% от веса)

ШАГ 3: BMR (формула Миффлина-Сан Жеора)
BMR от полного веса = (10 × ${userData.weight}) + (6.25 × ${userData.height}) − (5 × ${userData.age}) ${genderAdj} = ${userData.bmrFullWeight} ккал
BMR от сухой массы = (10 × ${userData.leanBodyMass.toFixed(1)}) + (6.25 × ${userData.height}) − (5 × ${userData.age}) ${genderAdj} = ${userData.bmrLeanMass} ккал

${bmrMethodText}
ИТОГОВЫЙ BMR = ${userData.bmr} ккал

ШАГ 4: TDEE
TDEE = BMR × ${activityCoef} = ${userData.totalCalories} ккал

ШАГ 5: Целевые калории
Целевые калории = TDEE ${goalText} = ${userData.targetCalories} ккал

ШАГ 6: Макронутриенты (${userData.isAthlete ? 'от полной массы - режим спортсмена' : 'от сухой массы'})
Белки = ${userData.isAthlete ? userData.weight.toFixed(1) : userData.leanBodyMass.toFixed(1)} кг × ${userData.proteinRatio} г/кг = ${userData.protein.grams} г (${userData.protein.calories} ккал)
Жиры = ${userData.isAthlete ? userData.weight.toFixed(1) : userData.leanBodyMass.toFixed(1)} кг × ${userData.fatRatio} г/кг = ${userData.fat.grams} г (${userData.fat.calories} ккал)
Углеводы = (${userData.targetCalories} - ${userData.protein.calories} - ${userData.fat.calories}) ÷ 4 = ${userData.carbs.grams} г (минимум 30г)
    `.trim();
    
    const formulaElement = document.getElementById('formulaDebug');
    if (formulaElement) {
        formulaElement.textContent = formulaText;
    }
}

// Сброс к рекомендованным значениям
function resetToRecommendations() {
    document.getElementById('finalProteinSlider').value = userData.proteinRatio;
    document.getElementById('finalFatSlider').value = userData.fatRatio;
    adjustMacros();
    
    showNotification('Значения сброшены к рекомендациям!', 'info');
}

// Настройка степени дефицита
function adjustDeficit() {
    const deficitPercent = parseInt(document.getElementById('deficitSlider').value);
    document.getElementById('deficitValue').textContent = deficitPercent;
    
    const deficitCalories = Math.round(userData.totalCalories * (deficitPercent / 100));
    document.getElementById('deficitCalories').textContent = deficitCalories;
    
    // Обновляем целевые калории
    userData.targetCalories = userData.totalCalories - deficitCalories;
    
    // Пересчитываем макронутриенты
    adjustMacros();
    
    // Проверяем ограничения по ИМТ
    checkDeficitLimits(deficitPercent);
}

// Проверка ограничений дефицита по ИМТ
function checkDeficitLimits(deficitPercent) {
    const bmi = userData.weight / ((userData.height / 100) ** 2);
    const warningDiv = document.getElementById('deficitWarning');
    const slider = document.getElementById('deficitSlider');
    
    // Для нормального ИМТ (<25) ограничиваем жесткий дефицит
    if (bmi < 25 && deficitPercent > 20) {
        warningDiv.style.display = 'block';
        if (deficitPercent > 25) {
            // Автоматически снижаем до максимально допустимого
            slider.value = 25;
            slider.max = 25;
            adjustDeficit();
        }
    } else {
        warningDiv.style.display = 'none';
        // Для высокого ИМТ разрешаем весь диапазон
        if (bmi >= 30) {
            slider.max = 30;
        } else if (bmi >= 25) {
            slider.max = 25;
        }
    }
}

// Показать блок дефицита только для цели похудения
function showDeficitAdjuster() {
    if (userData.goal === 'deficit') {
        document.getElementById('deficitAdjuster').style.display = 'block';
        // Инициализируем значения
        adjustDeficit();
    } else {
        document.getElementById('deficitAdjuster').style.display = 'none';
    }
}

// Оценка белков для шага настройки
function evaluateProteinStep(proteinRatio) {
    const titleElement = document.getElementById('proteinEvalTitleStep');
    const textElement = document.getElementById('proteinEvalTextStep');
    const proteinDiv = document.getElementById('proteinEvaluationStep');
    
    let title, text, className;
    
    if (proteinRatio < 1.0) {
        title = "Критически мало";
        text = "Крайне низкое потребление белка. Может привести к серьёзной потере мышечной массы, слабости и проблемам с иммунитетом.";
        className = "danger";
    } else if (proteinRatio < 1.2) {
        title = "Ниже минимума";
        text = "Недостаточно для поддержания мышечной массы. Минимальная рекомендация ВОЗ — 1.2 г/кг для взрослых.";
        className = "warning";
    } else if (proteinRatio >= 1.2 && proteinRatio < 1.4) {
        title = "Минимальная норма";
        text = "Подходит для малоподвижных людей без спортивных целей. Достаточно для поддержания базовых функций организма.";
        className = "good";
    } else if (proteinRatio >= 1.4 && proteinRatio < 1.8) {
        title = "Оптимальная норма";
        text = "Отлично! Идеально для активных людей и тех, кто хочет поддерживать мышечную массу. Рекомендуется большинству.";
        className = "excellent";
    } else if (proteinRatio >= 1.8 && proteinRatio < 2.2) {
        title = "Повышенная норма";
        text = "Хорошо для тех, кто активно тренируется. Поможет в восстановлении после тренировок и наборе мышечной массы.";
        className = "excellent";
    } else if (proteinRatio >= 2.2 && proteinRatio < 2.5) {
        title = "Спортивная норма";
        text = "Подходит для интенсивно тренирующихся спортсменов и людей на строгой диете. Максимум для роста мышц.";
        className = "good";
    } else {
        title = "Избыточное потребление";
        text = "Более 2.5 г/кг не даёт дополнительных преимуществ и может создать нагрузку на почки. Лучше перераспределить калории.";
        className = "warning";
    }
    
    titleElement.textContent = title;
    textElement.textContent = text;
    proteinDiv.className = `macro-evaluation protein-eval ${className}`;
}

// Оценка жиров для шага настройки
function evaluateFatStep(fatRatio) {
    const titleElement = document.getElementById('fatEvalTitleStep');
    const textElement = document.getElementById('fatEvalTextStep');
    const fatDiv = document.getElementById('fatEvaluationStep');
    
    let title, text, className;
    
    if (fatRatio < 0.5) {
        title = "Критически мало";
        text = "Опасно низкое потребление жиров. Серьёзный риск гормональных нарушений и дефицита жирорастворимых витаминов.";
        className = "danger";
    } else if (fatRatio < 0.7) {
        title = "Ниже минимума";
        text = "Недостаточно для нормальной выработки гормонов. Может привести к снижению тестостерона и проблемам с кожей.";
        className = "warning";
    } else if (fatRatio >= 0.7 && fatRatio < 0.9) {
        title = "Минимальная норма";
        text = "Подходит для строгих диет, но лучше увеличить до 1.0 г/кг для оптимального гормонального баланса.";
        className = "good";
    } else if (fatRatio >= 0.9 && fatRatio < 1.3) {
        title = "Оптимальная норма";
        text = "Отлично! Обеспечивает нормальную выработку гормонов, усвоение витаминов и здоровье кожи. Золотая середина.";
        className = "excellent";
    } else if (fatRatio >= 1.3 && fatRatio < 1.6) {
        title = "Повышенная норма";
        text = "Хорошо для тех, кто предпочитает жирную пищу или набирает массу. Может замедлить похудение из-за калорийности, но безопасно.";
        className = "good";
    } else if (fatRatio >= 1.6 && fatRatio < 2.0) {
        title = "Высокое потребление";
        text = "Очень много жиров. Затрудняет дефицит калорий, может вызвать вялость после еды, замедлить пищеварение и ухудшить результаты тренировок.";
        className = "warning";
    } else {
        title = "Критический избыток";
        text = "Экстремально высокое потребление жиров! Риск: набор жировой массы, проблемы с ЖКТ, вялость, плохая переносимость тренировок, нарушение усвоения других нутриентов.";
        className = "danger";
    }
    
    titleElement.textContent = title;
    textElement.textContent = text;
    fatDiv.className = `macro-evaluation fat-eval ${className}`;
}