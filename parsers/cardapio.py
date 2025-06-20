from xml.dom.minidom import parse

dom = parse("parsers/cardapio.xml")


cardapio = dom.documentElement

pratos = cardapio.getElementsByTagName('prato')

for prato in pratos:
    id = prato.getAttribute('id')

    elemento_nome = prato.getElementsByTagName('nome')[0]
    nome = elemento_nome.firstChild.nodeValue

    print(f"{id} - {nome}")

linha = "-"*50


print()
pratoEscolha = input("Digite o id do prato para saber mais: ")
print(f"{linha}\n")

for prato in pratos:
    id = prato.getAttribute('id')

    elemento_nome = prato.getElementsByTagName('nome')[0]
    nome = elemento_nome.firstChild.nodeValue

    elemento_descricao = prato.getElementsByTagName('descricao')[0]
    descricao = elemento_descricao.firstChild.nodeValue

    elemento_ingredientes = prato.getElementsByTagName('ingredientes')[0]
    elemento_ingrediente = elemento_ingredientes.getElementsByTagName('ingrediente')
    x = 0

    elemento_preco = prato.getElementsByTagName('preco')[0]
    preco = elemento_preco.firstChild.nodeValue

    elemento_calorias = prato.getElementsByTagName('calorias')[0]
    calorias = elemento_calorias.firstChild.nodeValue
    
    elemento_tempoPreparo = prato.getElementsByTagName('tempoPreparo')[0]
    tempoPreparo = elemento_tempoPreparo.firstChild.nodeValue

    if pratoEscolha == id:
        print("Nome:", nome)
        print(f'Descrição: {descricao}')
        print("Ingredientes:")
        for ingrediente in elemento_ingrediente:
            print(f" ° {ingrediente.firstChild.nodeValue}")
            x =+ 1
        print("Preço:", preco)
        print("Calorias:", calorias)
        print("Tempo de preparo:", tempoPreparo)