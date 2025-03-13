import {
  addToast,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import React, { useCallback, useMemo, useState } from "react";
import { PlusIcon } from "../../Icons/PlusIcon";
import { SearchIcon } from "../../Icons/SearchIcon";
import CreateModal from "../../components/Modals/CreateModal";
import { useAsyncList } from "@react-stately/data";
import { deleteData, getDatas } from "../../api/entity";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { EyeIcon } from "../../Icons/EyeIcon";
import { EditIcon } from "../../Icons/EditIcon";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { Popconfirm } from "antd";
import { ChevronDownIcon } from "../../Icons/ChevronDownIcon";

export const statusOptions = [
  { name: "Terminé", uid: 1 },
  { name: "En cours", uid: 0 },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export default function Home() {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateOpenChange,
  } = useDisclosure();
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = React.useState("all");

  // Utilisation de useAsyncList pour gérer les données avec tri
  const list = useAsyncList({
    async load({ signal }) {
      try {
        const result = await getDatas("tasks", { signal });

        return {
          items: result?.data?.sort((a, b) => b.id - a.id),
        };
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return { items: [] };
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const reloadData = () => {
    list.reload();
  };

  const filteredItems = useMemo(() => {
    return list.items.filter((meta) => {
      const matchesTitle = meta.title
        .toLowerCase()
        .includes(filterValue.toLowerCase());

      // Vérifie si le filtre de statut est appliqué (exclut "all")
      const matchesStatus =
        statusFilter === "all" ||
        Array.from(statusFilter).includes(String(meta.completed));

      return matchesTitle && matchesStatus;
    });
  }, [list.items, filterValue, statusFilter]);

  // Pagination
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value || "");
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const handleDelete = async (item) => {
    try {
      const res = await deleteData("tasks", item.id);
      if (res.isSuccess) {
        addToast({
          title: "Suppression",
          description: `${item.title} supprimer avec succès`,
          color: "success",
        });
        reloadData();
      } else {
        addToast({
          title: "Suppression",
          description: `Échec de la suppression`,
          color: "danger",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between mb-6">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Recherche..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Statut
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={onCreateOpen}
            >
              Nouvelle tâche
            </Button>
          </div>

          <CreateModal
            isOpen={isCreateOpen}
            onOpenChange={onCreateOpenChange}
            onSuccess={reloadData}
          />

          {/* <EditModal
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          onSuccess={reloadData}
          currentData={selectedData}
        /> */}
        </div>

        <div className="flex justify-between items-center mb-5">
          <span className="text-default-400 text-small">
            Total {list.items.length} enregistrement(s)
          </span>
          <label className="flex items-center text-default-400 text-small">
            Lignes par page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>

        <Table
          isStriped
          aria-label="Tableau des compétences avec tri client"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          bottomContentPlacement="outside"
          bottomContent={
            <div className="flex w-full justify-center">
              {!!pages && (
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              )}
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="title" allowsSorting>
              TITRE
            </TableColumn>
            <TableColumn key="prenom">DESCRIPTION</TableColumn>
            <TableColumn key="user">CRÉE PAR</TableColumn>
            <TableColumn key="created_at" allowsSorting>
              DATE
            </TableColumn>
            <TableColumn key="sexe">STATUT</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Aucune donnée à afficher.">
            {list.isLoading
              ? [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-3 w-5/5 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-5/5 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-5/5 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-5/5 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-5/5 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-5/5 rounded-lg" />
                    </TableCell>
                  </TableRow>
                ))
              : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="h-14">
                      <p className="min-w-[100px]">{item?.title}</p>
                    </TableCell>
                    <TableCell>
                      <p
                        className="min-w-[100px] max-w-[200px]"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {item?.description}
                      </p>
                    </TableCell>
                    <TableCell className="h-14">
                      <p className="min-w-[100px]">{item?.user?.name}</p>
                    </TableCell>
                    <TableCell className="h-14">
                      <p className="min-w-[100px]">
                        {format(item.created_at, "d MMM yyyy", { locale: fr })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Chip
                        className="capitalize"
                        color={item.completed ? "success" : "danger"} // Dynamique en fonction de completed
                        size="sm"
                        variant="flat"
                      >
                        {!!item.completed ? "Terminé" : "En cours"}
                      </Chip>
                    </TableCell>

                    <TableCell>
                      <div className="relative flex items-center gap-4">
                        {/* <Tooltip content="Détails">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              navigate(`/galerie-show/${item.id}/`)
                            }
                          >
                            <EyeIcon />
                          </span>
                        </Tooltip> */}
                        <Tooltip content="Modification" color="success">
                          <span
                            className="text-lg text-success-700 cursor-pointer active:opacity-50"
                            onClick={() => handleEdit(item)}
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content="Suppression" color="danger">
                          <span>
                            <Popconfirm
                              title="Confirmation"
                              description="Êtes-vous sûr de supprimer ?"
                              onConfirm={() => handleDelete(item)}
                              okText="Oui, je confirme"
                              cancelText="Non"
                            >
                              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                              </span>
                            </Popconfirm>
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
