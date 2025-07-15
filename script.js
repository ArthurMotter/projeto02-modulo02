// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Aplicar a máscara ao campo de telefone
    $('#telefone').mask('(00) 00000-0000');

    // --- TAREFA 4: LÓGICA DO BOTÃO CALCULAR ---
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        const plusButton = card.querySelector('.btn-plus');
        const minusButton = card.querySelector('.btn-minus');
        const quantitySpan = card.querySelector('.quantity');
        let currentQuantity = parseInt(quantitySpan.textContent);

        plusButton.addEventListener('click', () => {
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
        });

        minusButton.addEventListener('click', () => {
            if (currentQuantity > 0) {
                currentQuantity--;
                quantitySpan.textContent = currentQuantity;
            }
        });
    });

    const calculateButton = document.getElementById('btn-calcular');
    const orderSummaryContainer = document.getElementById('resumo-pedido');
    const customerNameInput = document.getElementById('nome');

    calculateButton.addEventListener('click', () => {
        // --- TAREFA 5: Lógica de Cálculo ---
        let orderItems = [];
        let totalPrice = 0;

        itemCards.forEach(card => {
            const quantity = parseInt(card.querySelector('.quantity').textContent);

            if (quantity > 0) {
                const itemName = card.querySelector('h3').textContent;
                const itemPriceString = card.querySelector('.price').textContent;
                const itemPrice = parseFloat(itemPriceString.replace('R$ ', '').replace(',', '.'));
                const subtotal = quantity * itemPrice;

                orderItems.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: quantity,
                });

                totalPrice += subtotal;
            }
        });

        // --- TAREFA 06: Exibição do Resumo ---
        orderSummaryContainer.innerHTML = '';

        if (orderItems.length === 0) {
            return;
        }

        const customerName = customerNameInput.value.trim() || 'Prezado(a) Cliente';

        let summaryHTML = `
            <h3>Caro(a) ${customerName},</h3>
            <p>Seguem os dados do seu pedido.</p>
            <p><strong>O seu pedido é:</strong></p>
            <div class="order-details">
        `;

        // Formatação dos preços
        orderItems.forEach(item => {
            const priceFormatted = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
            const subtotalFormatted = `R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`;

            summaryHTML += `
                <p>
                    • Prato: ${item.name} - 
                    Preço unitário: ${priceFormatted} - 
                    Quantidade: ${item.quantity} - 
                    Total: ${subtotalFormatted}
                </p>
            `;
        });

        const totalPriceFormatted = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

        summaryHTML += `
            </div>
            <h3 class="final-price">Preço final ${totalPriceFormatted}</h3>
        `;

        orderSummaryContainer.innerHTML = summaryHTML;
    });
});