let {getPath} = require('../hw3.js')
beforeAll(() => {
    document.body.innerHTML = `<div class="js-lesson learning-near learning-near_bar" data-id="38405" data-month="1">
    <div class="learning-near__main">
        <div class="learning-near__header learning-near__header_table">
            <div class="learning-near__header-link">
                <div class="learning-near__number">5</div>
            </div>
            <a href="#" class="learning-near__header-link js-learning-open" data-id="38405">
                <span class="learning-near__header-text">Test Driven Development</span>
                <span class="ic ic-fire learning-near__header-fire"></span>
            </a>
        </div>
    </div>
    <div class="learning-near__content js-learning-opened" data-id="38405">
        <div class="learning-near__item">
            <h2 class="learning-near__header">Цели занятия</h2>
            <div class="learning-near__desc">
                <p>разбирать примеры.</p>
            </div>
        </div>
        <div class="learning-near__item">
            <h2 class="learning-near__header">Краткое содержание</h2>
            <div class="learning-near__desc">
                <p>обзор фреймворков и библиотек для тестирования;<br>техники тестирования;<br>behavior Driven
                    Development.</p>
            </div>
        </div>
        <div class="learning-near__item">
            <h2 class="learning-near__header">Результаты</h2>
            <div class="learning-near__desc">
                <p>конспект лекции.</p>
            </div>
        </div>
        <div class="learning-near__item">
            <h2 class="learning-near__header">Преподаватель</h2>
            <div class="learning-near__desc">
                <p>Руслан Байгунусов</p>
            </div>
        </div>
        <div class="learning-near__item">
            <h2 class="learning-near__header">Компетенции</h2>
            <div class="learning-near__desc">
                <ul class="learning-near__item__competencies">
                    <li>
                        тестирование
                        <ul class="learning-near__item__competencies__skills">
                            <li>- модульные и юнит тесты</li>
                            <li>- TDD</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div name="50895" class="learning-near__item-group">
            <div class="learning-near__item">
                <h2 class="learning-near__header">Дата и время</h2>
                <div class="text text_default">
                    18 июля, понедельник в 20:00
                </div>
                <div class="text text_default">
                    Длительность занятия: 90 минут
                </div>
            </div>
            <div class="learning-near__item-poll-id" data-poll-id="46222"></div>
            <div class="learning-near__item">
                <h2 class="learning-near__header">Опрос</h2>
                Пожалуйста, пройдите <a href="/polls/46222/" title="опрос о занятии">опрос о занятии</a>
            </div>
        </div>
        <div class="learning-near__item">
            <h2 class="learning-near__header">Домашнее задание</h2>
            <div class="text text_p-small text_default learning-markdown js-learning-markdown"><p>getPath - поиск
                уникального селектора</p>
            </div>
            <div class="text text_p-small text_default text_bold">Цель:</div>
            <div class="text text_p-small text_default learning-markdown js-learning-markdown"><p>В ходе выполнения ДЗ
                студент напишет алгоритм и функцию <code>getPath()</code>, находяющую уникальный css-селектор для
                элемента в документе.</p>
            </div>
            <div class="text text_p-small text_default text_bold">Описание/Пошаговая инструкция выполнения домашнего
                задания:
            </div>
            <div class="text text_p-small text_default learning-markdown js-learning-markdown"><p>Написать алгоритм и
                функцию <code>getPath()</code>, текст <code>текст</code> и возвращать исходный элемент.
                Так чтобы <code>document.querySelectorAll()</code>, вызванный с этим селектором, не должен находить
                никаких элементов, кроме исходного.</p>
                <pre><code class="language-javascript">$0 // HTMLElement
getPath($0) // =&gt; "body div.someclass ul li:first-child"
</code></pre>
                <p>Использовать TDD, добавить юнит тесты для функции </p>
            </div>
            <div class="text text_p-small text_default text_bold">Критерии оценки:</div>
            <div class="text text_p-small text_default learning-markdown js-learning-markdown">
                <p>
                    <em>1.Факт свершения действия - ДЗ отправлена на проверку</em>
                    +1 балл
                    <em>2. Степень выполнения ДЗ</em>
                    +1 балл – результат скорее не достигнут, чем достигнут
                    +2 баллов – результат скорее достигнут, чем не достигнут
                    +3 балла – результат достигнут полностью
                    <em>3. Способ выполнения ДЗ</em>
                    +1 балл – использован неоптимальный способ достижения результата
                    +2 балл – оптимальный способ достижения результата использован частично
                    +3 балл -- использован наиболее оптимальный способ достижения результата
                    <em>4. Скорость выполнения ДЗ</em>
                    +1 балл - работа сдана под конец курса
                    +2 балла - работа сдана с отставанием
                    +3 балла - дедлайн соблюден
                    Статус "Принято" ставится при наборе 5 баллов
                </p>
            </div>
            <div class="text text_p-small text_default">Рекомендуем сдать до: 20.07.2022</div>
            <div id="testing_id">
                Статус:
                <a href="#/homework-chat/16822/" class="button learning-near__hw-button" title="Отправить ДЗ на проверку">
                    Отправить ДЗ на проверку
                </a>
            </div>
        </div>
    </div>
</div>
`
})
test('Ensure getPath function works', () => {
    expect(getPath(document.body)).toBe('body');
});

test('test getPath on em tags', () => {
    let HTMLCollection = document.body.getElementsByTagName('em')
    expect(HTMLCollection.length).toBe(4)//4 em в разметке

    expect(getPath(HTMLCollection[0])).toEqual('body div div:nth-child(2) div:nth-child(7) div:nth-child(8) p em:nth-child(1)')
    expect(document.querySelectorAll(getPath(HTMLCollection[0])).length).toEqual(1)
    expect(getPath(HTMLCollection[2])).toEqual('body div div:nth-child(2) div:nth-child(7) div:nth-child(8) p em:nth-child(3)')
    expect(document.querySelectorAll(getPath(HTMLCollection[2])).length).toEqual(1)
})

test('test getPath on text_p-small.text_default', () => {
    let HTMLCollection = document.body.querySelectorAll('div.text.text_p-small.text_default.text_bold')
    expect(HTMLCollection.length).toBe(3)//3 таких блока в разметке
    expect(getPath(HTMLCollection[0])).toEqual('body div div:nth-child(2) div:nth-child(7) div:nth-child(3)')
    expect(document.querySelectorAll(getPath(HTMLCollection[0])).length).toEqual(1)
    expect(getPath(HTMLCollection[1])).toEqual('body div div:nth-child(2) div:nth-child(7) div:nth-child(5)')
    expect(document.querySelectorAll(getPath(HTMLCollection[1])).length).toEqual(1)
    expect(getPath(HTMLCollection[2])).toEqual('body div div:nth-child(2) div:nth-child(7) div:nth-child(7)')
    expect(document.querySelectorAll(getPath(HTMLCollection[2])).length).toEqual(1)
})


test('test getPath on child of tag with id',()=>{
    let HTMLCollection = document.body.querySelectorAll('a.button.learning-near__hw-button')
    expect(HTMLCollection.length).toBe(1)//1 блок находяшийся внутри div с id
    expect(getPath(HTMLCollection[0])).toEqual('#testing_id a')
    expect(document.querySelectorAll(getPath(HTMLCollection[0])).length).toEqual(1)
})
