// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Aplicar a máscara ao campo de telefone
    $('#telefone').mask('(00) 00000-0000');

    // Instanciar o Modal do Bootstrap
    const pedidoModal = new bootstrap.Modal('#pedidoModal');

    // Selecionar os elementos do Modal
    const modalTitle = document.getElementById('pedidoModalLabel');
    const modalBody = document.querySelector('#pedidoModal .modal-body');

    // Lógica dos seletores de quantidade
    const itemCards = document.querySelectorAll('.card');
    itemCards.forEach(card => {
        const plusButton = card.querySelector('.btn-plus');
        const minusButton = card.querySelector('.btn-minus');
        const quantitySpan = card.querySelector('.quantity');

        plusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
        });

        minusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 0) {
                currentQuantity--;
                quantitySpan.textContent = currentQuantity;
            }
        });
    });

    const calculateButton = document.getElementById('btn-calcular');
    const customerNameInput = document.getElementById('nome');

    // Lógica de cálculo e injeção dinâmica do pedido
    calculateButton.addEventListener('click', () => {
        let orderItems = [];
        let totalPrice = 0;

        itemCards.forEach(card => {
            const quantity = parseInt(card.querySelector('.quantity').textContent);

            if (quantity > 0) {
                const itemName = card.querySelector('.card-title').textContent;
                const itemPriceString = card.querySelector('.card-text').textContent;
                const itemPrice = parseFloat(itemPriceString.replace('R$ ', '').replace(',', '.'));

                orderItems.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: quantity,
                });

                totalPrice += quantity * itemPrice;
            }
        });

        // Verificar se há itens no pedido
        if (orderItems.length === 0) {
            modalTitle.textContent = 'Erro no Pedido';
            modalBody.innerHTML = '<p class="text-danger">Você não selecionou nenhum item. Por favor, adicione produtos ao seu pedido antes de calcular.</p>';
        } else {
            const customerName = customerNameInput.value.trim() || 'Cliente';
            modalTitle.textContent = `Resumo do Pedido de ${customerName}`;

            let summaryHTML = `
                <p>Seguem os dados do seu pedido:</p>
                <hr>
            `;

            orderItems.forEach(item => {
                const priceFormatted = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
                const subtotalFormatted = `R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`;
                summaryHTML += `
                    <p>
                        <strong>Prato:</strong> ${item.name}<br>
                        <em>(Preço unitário: ${priceFormatted} - Quantidade: ${item.quantity})</em><br>
                        <strong>Subtotal: ${subtotalFormatted}</strong>
                    </p>
                `;
            });

            const totalPriceFormatted = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
            summaryHTML += `<hr><p class="fw-bold fs-5">Preço final: ${totalPriceFormatted}</p>`;

            modalBody.innerHTML = summaryHTML;
        }

        pedidoModal.show();
    });
});