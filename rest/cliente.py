import argparse
import users_wrapper as users

def main():
    parser = argparse.ArgumentParser(description="Gerenciar usuários da API")
    subparsers = parser.add_subparsers(dest="comando")

    subparsers.add_parser("list")

    read_parser = subparsers.add_parser("read")
    read_parser.add_argument("id")

    create_parser = subparsers.add_parser("create")
    create_parser.add_argument("name")
    create_parser.add_argument("email")

    update_parser = subparsers.add_parser("update")
    update_parser.add_argument("id")
    update_parser.add_argument("name")
    update_parser.add_argument("email")

    delete_parser = subparsers.add_parser("delete")
    delete_parser.add_argument("id")

    args = parser.parse_args()

    if args.comando == "list":
        print(users.list())

    elif args.comando == "read":
        print(users.read(args.id))

    elif args.comando == "create":
        data = {"name": args.name, "email": args.email}
        print(users.create(data))

    elif args.comando == "update":
        data = {"name": args.name, "email": args.email}
        print(users.update(args.id, data))

    elif args.comando == "delete":
        print(users.delete(args.id))

if __name__ == "__main__":
    main()
