#!/bin/sh
set -e

# Default values
WALLET_NAME=${WALLET_NAME:-"wallet"}
WALLET_PASSPHRASE=${WALLET_PASSPHRASE:-"polarpass"}

# Create wallet directory if it doesn't exist
mkdir -p /home/btcwallet/.btcwallet

# Check if wallet already exists
if [ ! -f "/home/btcwallet/.btcwallet/regtest/${WALLET_NAME}.db" ]; then
    echo "Creating new wallet: ${WALLET_NAME}"
    
    # Create the wallet using expect to handle the interactive prompts
    expect << EOF
        spawn btcwallet --regtest --create
        expect "Enter the private passphrase for your new wallet:"
        send "${WALLET_PASSPHRASE}\r"
        expect "Confirm passphrase:"
        send "${WALLET_PASSPHRASE}\r"
        expect "Do you want to add an additional layer of encryption for public data? (n/no/y/yes) \[no\]:"
        send "no\r"
        expect "Do you have an existing wallet seed you want to use? (n/no/y/yes) \[no\]:"
        send "no\r"
        expect "Your wallet generation seed is:"
        expect -re ".*"
        expect "IMPORTANT: Keep the seed in a safe place as you"
        expect "will NOT be able to restore your wallet without it."
        expect "Please keep in mind that anyone who has access"
        expect "to the seed can also restore your wallet thereby"
        expect "giving them access to all your funds, so it is"
        expect "imperative that you keep it in a secure location."
        expect "Once you have stored the seed in a safe and secure location, enter \"OK\" to continue:"
        send "OK\r"
        expect "Creating the wallet..."
        expect "The wallet has been created successfully."
        expect eof
EOF
else
    echo "Wallet ${WALLET_NAME} already exists"
fi 