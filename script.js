// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Aplicar a máscara ao campo de telefone
    $('#telefone').mask('(00) 00000-0000');

    // Seleciona todos os cards de produtos
    const itemCards = document.querySelectorAll('.card');

    itemCards.forEach(card => {
        const plusButton = card.querySelector('.btn-plus');
        const minusButton = card.querySelector('.btn-minus');
        const quantityInput = card.querySelector('.quantity');

        plusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity++;
            quantityInput.value = currentQuantity;
        });

        minusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 0) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
            }
        });
    });

    const calculateButton = document.getElementById('btn-calcular');
    const orderSummaryContainer = document.getElementById('resumo-pedido');
    const customerNameInput = document.getElementById('nome');

    // Cálculo do pedido
    calculateButton.addEventListener('click', () => {
        let orderItems = [];
        let totalPrice = 0;

        itemCards.forEach(card => {
            const quantity = parseInt(card.querySelector('.quantity').value);

            if (quantity > 0) {
                const itemName = card.querySelector('.card-title').textContent;
                const itemPriceString = card.querySelector('.card-text').textContent;
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