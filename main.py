answer = lambda a,b: a + b

print(answer(2,2))

names = ['EVGeNiI', 'ANAtolIi', 'AleX', 'NAtaSHA']
# new_names = []

# for name in names:
#     new_names.append(name.title())

new_names = list(map(lambda x: x.title(), names))
print(new_names)

mixed = ['рис', 'горох', 'рис', 'горох', 'горох', 'рис', 'рис', 'горох', 'горох', 'рис']
zolushka1 = []

for i in mixed:
    if i == 'рис':
        zolushka1.append(i)

zolushka2 = list(filter(lambda item: item == 'рис', mixed))

print(zolushka1)
print(zolushka2)
