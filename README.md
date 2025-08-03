1. Create a basic react/nextjs application
2. Connect our wallet wit a nicer connect application
3. Using Rainbowkit and wagmi
4. Implement this function
```javascript
function airdropERC20(
    address tokenAddress, // ERC20 token
    address[] calldata recipients,
    uint256[] calldata amounts,
    uint256 totalAmount
)
```
5. e2e(end-to-end) testing
    1. When we are connected, we see the airdrop form
    2. When disconnected, we don't
6. Deploy to fleek