// Função para gerar um número aleatório entre min e max
function getRandomNumber(min, max, isDecimal = false) {
    return isDecimal 
        ? (Math.random() * (max - min) + min).toFixed(2) 
        : Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar um intervalo aleatório entre min e max
function getRandomTimeout(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para obter a modal
function getModal() {
    return document.querySelector('.artdeco-modal.artdeco-modal--layer-default.jobs-easy-apply-modal');
}

// Função para clicar em botões com uma classe específica e ignorar aqueles com uma classe de exclusão
function clickButtonsWithClass(className, ignoreClass, callback) {
    const buttons = Array.from(document.querySelectorAll(`.${className}`))
        .filter(button => !button.classList.contains(ignoreClass));

    function clickNextButton(index) {
        if (index >= buttons.length) {
            if (callback) callback();
            return;
        }

        const button = buttons[index];
        if (button) {
            button.click();
            console.log(`Clicou no botão ${index + 1} com a classe ${className}`);
            
            // Verifica se o botão é clicável
            setTimeout(() => {
                const updatedButton = document.querySelector(`.${className}`);
                if (updatedButton && updatedButton !== button) {
                    console.log('Botão atualizado. Tentando clicar novamente.');
                    updatedButton.click();
                }
            }, getRandomTimeout(500, 1000));

            setTimeout(() => clickNextButton(index + 1), getRandomTimeout(500, 1000));
        } else {
            setTimeout(() => clickNextButton(index + 1), getRandomTimeout(500, 1000));
        }
    }

    clickNextButton(0);
}

function handleSalaryExpectation(callback) {
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada.');
        if (callback) callback();
        return;
    }

    modal.querySelectorAll('input[type="text"]').forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            const labelText = label.textContent.toLowerCase();
            if (labelText.includes('pretensão') || labelText.includes('salário') || labelText.includes('pj') || labelText.includes('clt')) {
                const value = '10000.00';
                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`Definiu o valor do campo de pretensão salarial como ${input.value}`);
            }
        }
    });

    setTimeout(callback, 3000);
}

function handleQuestions(callback) {
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada.');
        if (callback) callback();
        return;
    }

    modal.querySelectorAll('div.artdeco-text-input--container').forEach(container => {
        const label = container.querySelector('label');
        const input = container.querySelector('input');
        const labelText = label ? label.textContent.toLowerCase() : '';

        let answer;
        if (labelText.includes('ano') || labelText.includes('anos')) {
            answer = '5';
        } else if (labelText.includes('conhece') || labelText.includes('conhecimento')) {
            answer = 'sim';
        } else if (labelText.includes('tempo') || labelText.includes('trabalho') || labelText.includes('uso')) {
            answer = '5 anos';
        } else if (labelText.includes('trabalhar fora') || labelText.includes('trabalho fora')) {
            answer = 'sim';
        } else if (labelText.includes('viajar')) {
            answer = 'sim';
        } else if (labelText.includes('pretensão')) {
            answer = '10000';
        }

        if (input && answer !== undefined) {
            input.value = answer;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            console.log(`Definiu o valor do campo como ${answer}`);
        }
    });

    setTimeout(callback, 3000);
}

function handleDropdowns(callback) {
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada.');
        if (callback) callback();
        return;
    }

    modal.querySelectorAll('select').forEach(dropdown => {
        const options = Array.from(dropdown.querySelectorAll('option'));
        const id = dropdown.id;

        if (id.includes('multipleChoice')) {
            let selectedOption;
            if (id.includes('technology')) {
                selectedOption = options.find(option => option.textContent.trim().toLowerCase() === 'yes');
                console.log(`Selecionou a opção 'Yes' no dropdown de tecnologia`);
            } else if (id.includes('disability')) {
                selectedOption = options.find(option => option.textContent.trim().toLowerCase() === 'no');
                console.log(`Selecionou a opção 'No' no dropdown de deficiências`);
            } else {
                selectedOption = options[1] || options[0];
                console.log(`Selecionou a opção '${selectedOption.textContent}' no dropdown genérico`);
            }
            dropdown.value = selectedOption.value;
            dropdown.dispatchEvent(new Event('change'));
        }
    });

    setTimeout(callback, 3000);
}

function handleEmailsAndPhones(callback) {
    const defaultEmail = 'eliseu441@gmail.com';
    const defaultPhone = '+12997858024';
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada.');
        if (callback) callback();
        return;
    }

    modal.querySelectorAll('input[type="email"]').forEach(input => {
        input.value = defaultEmail;
        input.dispatchEvent(new Event('input'));
        console.log(`Definiu o valor do campo de email como ${defaultEmail}`);
    });

    modal.querySelectorAll('input[type="tel"]').forEach(input => {
        input.value = defaultPhone;
        input.dispatchEvent(new Event('input'));
        console.log(`Definiu o valor do campo de telefone como ${defaultPhone}`);
    });

    setTimeout(callback, 3000);
}

function handleYearQuestions(callback) {
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada.');
        if (callback) callback();
        return;
    }

    modal.querySelectorAll('input[type="number"]').forEach(input => {
        if (!input.value || isNaN(input.value)) {
            input.value = getRandomNumber(4, 4);
            input.dispatchEvent(new Event('input'));
            console.log(`Definiu o valor do campo de ano como ${input.value}`);
        }
    });

    setTimeout(callback, 3000);
}

function handleAgeFields(callback) {
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada.');
        if (callback) callback();
        return;
    }

    modal.querySelectorAll('input').forEach(input => {
        const placeholder = input.getAttribute('placeholder')?.toLowerCase();
        if (placeholder && placeholder.includes('idade')) {
            const maxLength = input.getAttribute('maxlength');
            input.value = (maxLength && parseInt(maxLength) >= 8) ? '24/09/1999' : '24';
            console.log(`Definiu o valor do campo de idade como ${input.value}`);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    setTimeout(callback, 3000);
}

function ensureFieldsFilled(callback) {
    handleDropdowns(() => {
        handleEmailsAndPhones(() => {
            handleYearQuestions(() => {
                handleSalaryExpectation(() => {
                    handleAgeFields(callback);
                });
            });
        });
    });
}

function clickAndCheckNext(callback) {
    const currentDiv = document.querySelector('div.current');

    if (currentDiv) {
        const nextDiv = Array.from(document.querySelectorAll('div.job-card-container'))
            .find(div => div.compareDocumentPosition(currentDiv) === Node.DOCUMENT_POSITION_FOLLOWING);

        if (nextDiv) {
            nextDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                const nextButton = nextDiv.querySelector('button');
                if (nextButton) {
                    nextButton.click();
                    console.log('Clicou no botão da próxima div.');
                    setTimeout(() => {
                        clickButtonsWithClass('artdeco-button--2.artdeco-button--primary', 'note-on', callback);
                    }, getRandomTimeout(1000, 1400));
                } else {
                    console.log('Nenhum botão encontrado na próxima div.');
                    callback();
                }
            }, getRandomTimeout(1000, 1400));
        } else {
            console.log('Não há mais divs para processar.');
            callback();
        }
    } else {
        console.log('Div atual não encontrada.');
        callback();
    }
}

function observeModalClosure(callback) {
    const modal = getModal();
    if (!modal) {
        console.log('Modal não encontrada para observação.');
        if (callback) callback();
        return;
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (!document.contains(modal)) {
                console.log('Modal fechada.');
                observer.disconnect(); // Para a observação quando a modal é fechada
                if (callback) callback();
            }
        });
    });

    observer.observe(modal.parentNode, { childList: true, subtree: true });
}

async function clickJobsApplyButton() {
    return new Promise((resolve) => {
        clickButtonsWithClass('jobs-apply-button', 'note-on', () => {
            clickButtonsWithClass('artdeco-button--2.artdeco-button--primary', 'note-on', () => {
                observeModalClosure(() => {
                    ensureFieldsFilled(() => {
                        clickAndCheckNext(() => {
                            console.log('Processo de aplicação concluído.');
                            resolve(); // Resolvendo a promessa quando o processo terminar
                        });
                    });
                });
            });
        });
    });
}

// Função extra para clicar no próximo ícone
async function clickNextIcon() {
    return new Promise((resolve) => {
        let currentIndex = window.currentIndex ? window.currentIndex : 0;
        const icons = document.querySelectorAll('.ivm-image-view-model.job-card-list__logo-ivm');

        if (icons.length === 0) {
            console.log('Nenhum ícone encontrado.');
            resolve(); // Resolvendo a promessa imediatamente se não houver ícones
            return;
        }

        if (currentIndex >= icons.length) {
            console.log('Todos os ícones foram clicados.');
            r=esolve(); // Resolvendo a promessa quando todos os ícones foram clicados
            return;
        }

        icons[currentIndex].click();
        window.currentIndex = currentIndex + 1;

        setTimeout(() => {
            resolve(); // Resolvendo a promessa após a espera
        }, 3000);
    });
}

// Função principal para iniciar o processo
async function startProcess() {
    while (true) {
        await clickJobsApplyButton(); // Espera a aplicação terminar
        await clickNextIcon(); // Espera o próximo ícone ser clicado
    }
}

// Inicia o processo
startProcess();