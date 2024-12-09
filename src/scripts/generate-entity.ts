import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';

// Define field types for type mapping
const typeMap: { [key: string]: string } = {
    'string': 'string',
    'number': 'number',
    'boolean': 'boolean',
    'date': 'Date',
    'email': 'string',
    'text': 'string'
};

// Function to generate entity file
function generateEntity(entityName: string, fields: { [key: string]: string }) {
    // Capitalize first letter of entity name
    const capitalizedEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    
    // Generate imports
    const imports = [
        "import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';"
    ];

    // Generate class with decorators
    let entityContent = `${imports.join('\n')}\n
@Entity('${entityName.toLowerCase()}')
export class ${capitalizedEntityName} {
    @PrimaryGeneratedColumn()
    id!: number;\n`;

    // Add fields with appropriate decorators
    Object.entries(fields).forEach(([fieldName, fieldType]) => {
        let tsType = typeMap[fieldType.toLowerCase()] || 'string';
        let columnOptions = {};

        // Special decorators for specific types
        switch (fieldType.toLowerCase()) {
            case 'email':
                columnOptions = { unique: true };
                break;
            case 'text':
                columnOptions = { type: 'text' };
                break;
            case 'date':
                columnOptions = { type: 'timestamp' };
                break;
        }

        const columnDecorator = Object.keys(columnOptions).length > 0 
            ? `@Column(${JSON.stringify(columnOptions)})` 
            : '@Column()';

        entityContent += `
    ${columnDecorator}
    ${fieldName}!: ${tsType};\n`;
    });

    // Close class
    entityContent += '}\n';

    return entityContent;
}

// Function to generate migration file
async function generateMigrationFile(entityName: string, fields: { [key: string]: string }) {
    // Import DataSource configuration
    const { AppDataSource } = await import('../config/database');
    await AppDataSource.initialize();

    // Capitalize first letter of entity name
    const capitalizedEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    const tableName = `${entityName.toLowerCase()}s`;

    // Timestamp for migration name
    const timestamp = Date.now();
    const migrationName = `${capitalizedEntityName}${timestamp}`;
    const migrationDir = path.join(__dirname, '..', 'migrations');
    const migrationFileName = path.join(migrationDir, `${timestamp}-${entityName.toLowerCase()}.ts`);

    // Generate migration content
    const migrationContent = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${capitalizedEntityName}${timestamp} implements MigrationInterface {
    name = '${capitalizedEntityName}${timestamp}'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS \`${entityName.toLowerCase()}\` (\`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY, ${Object.entries(fields).map(([fieldName, fieldType]) => {
            const sqlType = fieldType.toLowerCase() === 'text' ? 'text' : 'varchar(255)';
            return `\`${fieldName}\` ${sqlType} NOT NULL`;
        }).join(', ')}) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS \`${entityName.toLowerCase()}\`");
    }
}`;

    // Write migration file
    fs.writeFileSync(migrationFileName, migrationContent);
    console.log(`Migration file ${migrationFileName} created successfully!`);

    // Destroy the data source connection
    await AppDataSource.destroy();
}

// Main function to create entity file
async function createEntityFile(entityName: string, fields: { [key: string]: string }) {
    const entitiesDir = path.join(__dirname, '..', 'entities');
    const filename = `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}.ts`;
    const filepath = path.join(entitiesDir, filename);

    // Check if file already exists
    if (fs.existsSync(filepath)) {
        console.error(`Entity file ${filename} already exists!`);
        process.exit(1);
    }

    // Generate and write entity file
    const entityContent = generateEntity(entityName, fields);
    fs.writeFileSync(filepath, entityContent);
    
    console.log(`Entity file ${filename} created successfully!`);

    // Generate migration file
    await generateMigrationFile(entityName, fields);
}

// Main execution
async function main() {
    // Parse command line arguments
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: ts-node generate-entity.ts <EntityName> [<field1>:<type1> <field2>:<type2> ...]');
        process.exit(1);
    }

    // Extract entity name and fields
    const entityName = args[0];
    const fields: { [key: string]: string } = {};
    
    // If additional fields are provided, parse them
    if (args.length > 1) {
        args.slice(1).forEach(arg => {
            const [fieldName, fieldType] = arg.split(':');
            if (!fieldName || !fieldType) {
                console.error(`Invalid field format: ${arg}. Use fieldName:fieldType`);
                process.exit(1);
            }
            fields[fieldName] = fieldType;
        });
    }

    // If no fields provided, add a default 'name' field
    if (Object.keys(fields).length === 0) {
        fields['name'] = 'string';
    }

    // Create the entity and migration
    await createEntityFile(entityName, fields);
}

// Run the main function
main().catch(console.error);
