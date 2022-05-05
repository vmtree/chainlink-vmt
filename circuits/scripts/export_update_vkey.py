#!/usr/bin/env python3

def find_verifying_key(lines: list, end: int):
    for l, line in enumerate(lines):
        if 'function verifyingKey() internal' in line:
            start = l + 1
        elif f'vk.IC[{end}] = Pairing.G1Point(' in line:
            stop = l + 4
    return ''.join(lines[start:stop])

if __name__ == '__main__':
    with open('./out/update_verifier.sol', 'r') as f:
        update_verifier = f.readlines()

    update_vkey = find_verifying_key(update_verifier, 42)

    with open('./src/verifier_templates/UpdateVerifier.sol', 'r') as f:
        update_template = f.read()

    with open('./out/UpdateVerifier.sol', 'w+') as f:
        k = update_template.replace('// VERIFYING_KEY', update_vkey)
        f.write(k.replace('Pairing', 'ProofLib'))