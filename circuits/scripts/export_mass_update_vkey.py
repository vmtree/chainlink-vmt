#!/usr/bin/env python3

def find_verifying_key(lines: list, end: int):
    for l, line in enumerate(lines):
        if 'function verifyingKey() internal' in line:
            start = l + 1
        elif f'vk.IC[{end}] = Pairing.G1Point(' in line:
            stop = l + 4
    return ''.join(lines[start:stop])

if __name__ == '__main__':
    with open('./out/mass_update_verifier.sol', 'r') as f:
        mass_update_verifier = f.readlines()

    mass_update_vkey = find_verifying_key(mass_update_verifier, 51)

    with open('./src/verifier_templates/MassUpdateVerifier.sol', 'r') as f:
        mass_update_template = f.read()

    with open('./out/MassUpdateVerifier.sol', 'w+') as f:
        k = mass_update_template.replace('// VERIFYING_KEY', mass_update_vkey)
        f.write(k.replace('Pairing', 'ProofLib'))